"""Build both complete static reading editions from the frozen v8 manuscript."""
import argparse
import html
import json
from pathlib import Path
import re
import shutil
import xml.etree.ElementTree as ET

import bibtexparser
from bs4 import BeautifulSoup
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markupsafe import Markup
from PIL import Image
from pylatexenc.latex2text import LatexNodes2Text

REPO = Path(__file__).resolve().parents[2]
ASSETS = REPO / "assets/generative-ai"
SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
PLAIN = LatexNodes2Text()
TASK_ZH = ["新样本合成", "跨域转换", "定向编辑", "修复与补全", "测量约束重建", "时序生成", "条件生成", "文本条件生成", "可控生成", "少样本生成", "零样本／免训练", "数据高效生成", "多任务生成", "多模态生成", "联合生成", "图像", "纹理与外观", "形状", "4D／3D+t", "帧插值", "动作条件／世界模型", "GAN", "扩散模型", "流匹配", "保真度", "效率", "测量一致性"]
GROUP_ZH = ["任务操作", "条件与控制", "数据与适配条件", "任务组织", "生成对象", "时间结构", "建模机制", "约束与评价"]
UI_EN = dict(skip="Skip to content", header_nav="Library navigation", language="Language", papers="Paper library", subtitle="Machine learning → computer vision → medical image analysis.", draft="Research draft · v8", october="October", eight_27="8 coordinates · 27 subitems", explore="Explore the taxonomy", pdf="Read the paper", abstract="Abstract", chapters="Chapters", references="References", discovery="Discovery, quantitative frame, and evidence selection", coding="Coding, trajectories, and sensitivity", histories="Representative histories and reading order", frame="fixed-query title–abstract records", unique_papers="distinct timeline publications", positions="paper–subtask positions", fulltext="selected full-text passage checks", atlas="Eight composable coordinates and27 subtask trends", dimensions="Generative-model coordinates", subtasks="subitems", correspondence="ML–CV–medical correspondence", timeline="Representative publication timeline", papers_word="papers", figure="Figure", changes="What changes, and what the curves cannot establish", combinations="Combinations matter more than isolated keywords", supported_use="From capability to supported use", validation="Selected medical validation paths", acquisition="Acquisition and reconstruction: preserve decision-relevant information", diagnostic="Diagnostic translation: preserve the structure behind the label", virtual_trials="Virtual trials: validate the population and the simulator", missing_evidence="Choose the missing evidence, not the fashionable label", decisions="From a literature gap to a decisive research pilot", four_hypotheses="Four bounded medical-oriented hypotheses", limitations="Limitations and next decisions", transparency="Transparency and reproducibility", paper_title_label="Manuscript:", search="Search title, abstract, model or author", year="Publication year", all_years="All years", subtask="Subtask", all_tasks="All27 subitems", previous="Previous", next="Next", close="Close", back_library="Back to library")
UI_ZH = dict(skip="跳至正文", header_nav="知识库导航", language="语言", papers="论文文献库", subtitle="从机器学习，到计算机视觉，再到医学图像分析。", draft="研究草稿 · v8", october="10月", eight_27="8个维度 · 27个子项", explore="浏览知识体系", pdf="阅读论文", abstract="摘要", chapters="章节", references="参考文献", discovery="文献发现、量化框架与证据筛选", coding="词典标注、趋势与敏感性分析", histories="代表论文历史与阅读顺序", frame="固定检索式下的题名与摘要记录", unique_papers="时间线中的不同论文", positions="论文与子任务的对应位置", fulltext="代表来源的全文选段核查", atlas="八个可组合维度与27个子项趋势", dimensions="生成模型的八个描述维度", subtasks="子项", correspondence="ML–CV–医学影像对应关系", timeline="代表论文时间线", papers_word="篇论文", figure="图", changes="哪些内容正在变化，曲线不能证明什么", combinations="维度组合比孤立关键词更重要", supported_use="从已实现能力到有证据支持的用途", validation="选定医学场景的验证路径", acquisition="采集与重建：保留影响决策的信息", diagnostic="诊断性转换：保留标签背后的结构", virtual_trials="虚拟试验：同时验证人群与仿真器", missing_evidence="选择缺失的证据，而不是追逐热门名称", decisions="从文献缺口到有判别力的研究试验", four_hypotheses="四个有边界的医学研究假设", limitations="局限与下一步决策", transparency="透明性与可复现性", paper_title_label="论文原题：", search="检索题名、摘要、模型或作者", year="论文年份", all_years="全部年份", subtask="子任务", all_tasks="全部27个子项", previous="上一篇", next="下一篇", close="关闭", back_library="返回知识库")
CHAPTERS = [
    ("scope", "Scope and methods", "范围与方法", "Scope", "范围与方法"),
    ("overview", "Eight coordinates, 27 subitems", "八维27项总览", "Overview", "总览"),
    ("dimensions", "Eight dimensions in detail", "逐维逐项理解生成模型", "Dimensions", "八维27项"),
    ("synthesis", "Cross-dimensional trends and evidence", "跨维度趋势与证据综合", "Synthesis", "趋势与证据"),
    ("medical", "Medical needs and validation", "医学需求与验证", "Medical", "医学验证"),
    ("agenda", "Research opportunities and limitations", "研究机会与局限", "Research agenda", "研究议程"),
    ("conclusion", "Conclusion", "结论", "Conclusion", "结论"),
]
UI_EN.update(atlas="Eight composable coordinates and 27 subtask trends", all_tasks="All 27 subitems")


def write_json(file, value):
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def plain(value):
    return PLAIN.latex_to_text(value or "").strip()


def sanitize_translation(source, target):
    a, b = BeautifulSoup(source, "html.parser"), BeautifulSoup(target, "html.parser")
    assert [(n.name, dict(n.attrs)) for n in a.find_all()] == [(n.name, dict(n.attrs)) for n in b.find_all()], "Translation changed HTML structure"
    for x, y in zip(a.select(".math,.equation"), b.select(".math,.equation")):
        assert x.get_text() == y.get_text(), "Translation changed mathematics"


def interactive_svg(source, target, geometry, paper_by_ref, titles):
    tree = ET.parse(source)
    svg = tree.getroot()
    count = 0
    for group in list(svg.iter(f"{{{SVG}}}g")):
        texts = list(group.findall(f"{{{SVG}}}text"))
        reference = next((int(m[1]) for t in texts if (m := re.fullmatch(r"\[(\d+)\]", "".join(t.itertext())))), None)
        if reference is None:
            continue
        key = paper_by_ref[reference]
        for child in list(group):
            if child.tag == f"{{{SVG}}}title" or child.get("class") == "paper-hit":
                group.remove(child)
        node = next(n for n in geometry["nodes"] if n["key"] == key)
        top = geometry["height"] - (geometry["axis_y"] + node["distance"] + node["height"]) if node["side"] > 0 else geometry["height"] - (geometry["axis_y"] - node["distance"])
        rect = ET.Element(f"{{{SVG}}}rect", {"class": "paper-hit", "x": str((node["x"] - node["width"]/2 - .055)*72), "y": str((top-.035)*72), "width": str((node["width"]+.11)*72), "height": str((node["height"]+.07)*72), "fill": "transparent", "stroke": "transparent"})
        group.insert(0, rect)
        group.set("class", "paper-node")
        group.set("data-paper", key)
        group.set("tabindex", "0")
        group.set("role", "button")
        group.set("aria-label", titles[key])
        tip = ET.SubElement(group, f"{{{SVG}}}title")
        tip.text = titles[key]
        count += 1
    assert count == 20, (source, count)
    target.parent.mkdir(parents=True, exist_ok=True)
    tree.write(target, encoding="utf-8", xml_declaration=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", default="C:/lfm/code/survey/survey/GenerativeAI")
    parser.add_argument("--allow-incomplete", action="store_true")
    args = parser.parse_args()
    project = Path(args.project)
    research = project / "research/library_site_v9"
    manuscript = project / "manuscript/compact_v8"
    catalogue = json.loads((project / "research/compact_timelines_v8/timeline_catalog.json").read_text())
    geometry = json.loads((project / "figures/compact_v8/timelines/timeline_figure_validation.json").read_text())["geometry"]
    article = json.loads((research / "article_en.json").read_text(encoding="utf-8"))
    translations, article_zh = {}, {}
    for file in sorted((research / "translations").glob("papers_*_zh.json")):
        for row in json.loads(file.read_text(encoding="utf-8")):
            assert row["key"] not in translations
            translations[row["key"]] = row
    for file in sorted((research / "translations").glob("article_*_zh.json")):
        for row in json.loads(file.read_text(encoding="utf-8")):
            assert row["id"] not in article_zh
            article_zh[row["id"]] = row["html_zh"]
    papers_en = json.loads((research / "papers_en.json").read_text(encoding="utf-8")) + json.loads((research / "papers_supplement_en.json").read_text(encoding="utf-8"))
    if (research / "abstract_repairs.json").exists():
        repairs = {p["key"]: p for p in json.loads((research / "abstract_repairs.json").read_text(encoding="utf-8"))}
        for paper in papers_en:
            if paper["key"] in repairs:
                paper.update({k: repairs[paper["key"]][k] for k in ["title", "abstract"]})
    assert len(papers_en) == len({p["key"] for p in papers_en}) == 383
    all_keys = {p["key"] for p in papers_en}
    missing_papers = sorted(all_keys - translations.keys())
    missing_blocks = sorted({p["id"] for p in article["blocks"]} - article_zh.keys())
    if not args.allow_incomplete:
        assert not missing_papers, missing_papers
        assert not missing_blocks, missing_blocks
    block_en = {p["id"]: p["html_en"] for p in article["blocks"]}
    for key, value in article_zh.items():
        sanitize_translation(block_en[key], value)
    refs = json.loads((project / "research/compact_timelines_v8/citation_numbers.json").read_text())
    fig_positions = json.loads((project / "research/compact_timelines_v8/delivery_validation.json").read_text())["object_context"]
    bridge = json.loads((project / "research/structure_revision_v7/bridge_content.json").read_text())["groups"]
    with (manuscript / "references.bib").open(encoding="utf-8") as f:
        bibliography = {p["ID"]: p for p in bibtexparser.load(f).entries}
    references = []
    for key, number in sorted(refs.items(), key=lambda p: p[1]):
        p = bibliography[key]
        doi = plain(p.get("doi", ""))
        url = plain(p.get("url", "")) or ("https://doi.org/" + doi if doi else "https://scholar.google.com/scholar?q=" + requests_quote(plain(p.get("title", ""))))
        references.append({"key": key, "number": number, "title": plain(p.get("title")), "authors": plain(p.get("author", "")).replace(" and ", ", "), "year": p.get("year", ""), "url": url})
    assert len(references) == 421
    task_index = {label: i+1 for i, label in enumerate(label for facet in catalogue["facets"] for label in facet["leaves"])}
    for p in papers_en:
        p["tasks"] = [task_index[label] for label, t in catalogue["subtasks"].items() if p["key"] in t["paper_keys"]]
    memberships = sum(len(p["tasks"]) for p in papers_en)
    assert memberships == 540
    asset_sources = {"F1_coordinates_and_trends": project / "figures/compact_v8/atlas/F1_coordinates_and_trends.svg",
                     "S1_medical_validation": project / "figures/compact_v8/synthesis/S1_medical_validation.svg", "S2_research_decisions": project / "figures/compact_v8/synthesis/S2_research_decisions.svg"}
    asset_sources.update({g["stem"]: project / "figures/compact_v8/bridges" / (g["stem"] + ".svg") for g in bridge})
    for stem, source in asset_sources.items():
        target = ASSETS / "figures/en" / (stem + ".svg")
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        if not args.allow_incomplete:
            zh = ASSETS / "figures/zh" / (stem + ".svg")
            assert zh.exists() and ET.parse(zh).getroot().get("data-language") == "zh", stem
    zh_geometry_file = research / "zh_timeline_geometry.json"
    zh_geometry = json.loads(zh_geometry_file.read_text()) if zh_geometry_file.exists() else geometry
    for lang in ["en", "zh"]:
        ui = UI_EN if lang == "en" else UI_ZH
        locale_papers = []
        for p in papers_en:
            translated = translations.get(p["key"], {}) if lang == "zh" else {}
            locale_papers.append({"key": p["key"], "title": translated.get("title_zh", p["title"]), "abstract": translated.get("abstract_zh", p["abstract"]),
                "original_title": p["title"], **{k: p[k] for k in ["short_name", "authors", "date", "url", "reference", "tasks"]},
                "abstract_source": p["abstract_provenance"].get("abstract_source", p["url"]),
                "source_note": (("原始 arXiv 摘要以不完整的句子开头；此处忠实保留，没有补写缺失内容。" if lang == "zh" else "The original arXiv abstract starts with an incomplete sentence; it is preserved without invented text.") if p["key"] == "tl240517176" else "")})
        locale_papers.sort(key=lambda p: p["reference"])
        write_json(ASSETS / f"data/papers.{lang}.json", locale_papers)
        paper_by_key = {p["key"]: p for p in locale_papers}
        by_ref = {p["reference"]: p["key"] for p in locale_papers}
        title_by_key = {p["key"]: p["title"] for p in locale_papers}
        bmap = block_en if lang == "en" else {key: article_zh.get(key, value) for key, value in block_en.items()}
        def block(key):
            value = bmap[key]
            value = rewrite_crossrefs(value, lang, fig_positions)
            return Markup(value)
        def blocks(*keys):
            return Markup("".join(f'<div class="body-block" id="prose-{k}" data-prose="{k}">{block(k)}</div>' for k in keys))
        chapters = [{"id": c[0], "title": c[1 if lang == "en" else 2], "short": c[3 if lang == "en" else 4]} for c in CHAPTERS]
        def heading(key):
            c = next(c for c in chapters if c["id"] == key)
            n = chapters.index(c) + 1
            return Markup(f'<div class="section-heading"><h2 id="{key}-title">{html.escape(c["title"])}</h2><span class="section-number">{n:02} / 07</span></div>')
        def icon(name):
            return Markup(f'<i class="icon" data-lucide="{name}" aria-hidden="true"></i>')
        def table(number):
            t = article["tables"][number-1]
            names = (["The eight-coordinate reading contract", "Cross-coordinate co-mentions", "Source-specific evidence ledger", "Four medical-oriented opportunity tests"] if lang == "en" else ["八维阅读与比较契约", "跨维度词汇共现", "具名研究的证据与边界", "四个医学研究机会的进入条件"])
            label = ["coordinates", "compositions", "evidence", "agenda"][number-1]
            rows = []
            for ri, row in enumerate(t["rows"]):
                tag = "th" if ri == 0 else "td"
                cells = [bmap[f"cell_{t['id']}_{ri}_{ci}"] for ci in range(len(row))]
                rows.append("<tr>" + "".join(f'<{tag}>{cell}</{tag}>' for cell in cells) + "</tr>")
            return Markup(f'<p class="table-title" id="tab-{label}">{"Table" if lang == "en" else "表"} {number} · {names[number-1]}</p><div class="table-wrap"><table><thead>{rows[0]}</thead><tbody>{"".join(rows[1:])}</tbody></table></div>')
        def figure(stem, kind, title):
            ids = {"F1_coordinates_and_trends": "fig:coordinates", "S1_medical_validation": "fig:medical_paths", "S2_research_decisions": "fig:research_gates"}
            key = ids.get(stem) or "fig:bridge_" + str(next(g["group_id"] for g in bridge if g["stem"] == stem))
            number = fig_positions[key]["number"]
            path = f"/assets/generative-ai/figures/{lang}/{stem}.svg"
            return Markup(f'<figure class="source-figure {kind}" id="{key.replace(":","-")}"><div class="figure-scroll"><a href="{path}" data-zoom data-caption="{html.escape(title)}"><img src="{path}" alt="{html.escape(title)}" loading="lazy" decoding="async"></a></div><figcaption><span>{ui["figure"]} {number} · {html.escape(title)}</span><a href="{path}" target="_blank" rel="noopener">SVG {icon("arrow-up-right")}</a></figcaption></figure>')
        groups, tasks = [], []
        for facet, group in zip(catalogue["facets"], bridge):
            group_index = group["group_id"]
            children = []
            for label in facet["leaves"]:
                n = task_index[label]
                task = catalogue["subtasks"][label]
                stem = geometry[label]["file"]
                name = task["name"] if lang == "en" else TASK_ZH[n-1]
                source = project / "figures/compact_v8/timelines" / (stem + ".svg")
                if lang == "zh" and (ASSETS / "figures/zh" / (stem + ".svg")).exists():
                    source = ASSETS / "figures/zh" / (stem + ".svg")
                elif lang == "zh" and not args.allow_incomplete:
                    raise ValueError("Missing Chinese figure: " + stem)
                interactive_svg(source, ASSETS / "figures" / lang / (stem + ".svg"), (zh_geometry if lang == "zh" else geometry)[label], by_ref, title_by_key)
                ids = ([f"P{13+(n-1)*2}", f"P{14+(n-1)*2}"] if n <= 6 else []) + [f"T{n:02}a"]
                figure_id = "fig:timeline_" + label.replace(":", "_")
                item = {"index": n, "name": name, "stem": stem, "keys": task["paper_keys"], "papers": [paper_by_key[k] for k in task["paper_keys"]], "prose": blocks(*ids),
                        "figure_id": figure_id.replace(":", "-"), "figure_number": fig_positions[figure_id]["number"]}
                children.append(item)
                tasks.append(item)
            groups.append({"index": group_index, "name": facet["name"].replace("\n", " ") if lang == "en" else GROUP_ZH[group_index-1],
                           "range": f'{children[0]["index"]:02}–{children[-1]["index"]:02}', "tasks": children, "block": f"B{group_index:02}", "stem": group["stem"]})
        env = Environment(loader=FileSystemLoader(Path(__file__).parent), autoescape=select_autoescape(["html", "xml", "j2"]))
        content = env.get_template("page.html.j2").render(lang=lang, html_lang="en" if lang == "en" else "zh-CN", permalink="/library/generative-ai/" + ("zh/" if lang == "zh" else ""),
            ui=ui, chapters=chapters, groups=groups, tasks=tasks, references=references, timeline_keys=all_keys, block=block, blocks=blocks, figure=figure, table=table, heading=heading, icon=icon,
            description="Eight coordinates, 27 subitems and an evidence-based research agenda from ML to CV and medical imaging." if lang == "en" else "生成模型八维27项知识体系，结合383篇代表论文、趋势分析、医学需求与研究议程。",
            card_description="A bilingual, source-linked survey: eight coordinates, 27 subitems, 383 representative papers.",
            paper_title="Generative Models for Vision and Medical Imaging: Eight Coordinates, 27 Subtasks, and an Evidence-Based Research Agenda")
        destination = REPO / ("_library/generative-ai.html" if lang == "en" else "_pages/generative-ai-zh.html")
        destination.write_text("\n".join(line.rstrip() for line in content.splitlines()) + "\n", encoding="utf-8")
    for svg in (ASSETS / "figures").rglob("*.svg"):
        value = svg.read_text(encoding="utf-8")
        svg.write_text("\n".join(line.rstrip() for line in value.splitlines()) + "\n", encoding="utf-8")
    for folder in ["downloads", "vendor"]:
        (ASSETS / folder).mkdir(parents=True, exist_ok=True)
    for name in ["GenerativeAI_survey_v8.pdf", "GenerativeAI_LaTeX_v8.zip"]:
        shutil.copy2(project / "submit/GenerativeAI_compact_v8" / name, ASSETS / "downloads" / name)
    runtime = Path("C:/Users/fengminglin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/lucide")
    shutil.copy2(runtime / "dist/umd/lucide.min.js", ASSETS / "vendor/lucide.min.js")
    shutil.copy2(runtime / "LICENSE", ASSETS / "vendor/LUCIDE_LICENSE")
    atlas_source = Image.open(project / "figures/compact_v8/atlas/F1_coordinates_and_trends.png").convert("RGB")
    original = atlas_source.copy()
    original.thumbnail((1100, 1000))
    original.save(ASSETS / "thumbnail.webp", quality=90)
    # The site's shared figure helper retains the .webp suffix in srcset paths.
    for width in [480, 800, 1400]:
        height = round(atlas_source.height * width / atlas_source.width)
        atlas_source.resize((width, height), Image.Resampling.LANCZOS).save(ASSETS / f"thumbnail.webp-{width}.webp", quality=90)
    report = {"papers": 383, "memberships": memberships, "article_blocks": len(block_en), "translated_papers": len(translations), "translated_article_blocks": len(article_zh),
              "missing_papers": missing_papers, "missing_blocks": missing_blocks, "strict": not args.allow_incomplete, "source_manuscript": "compact_v8", "status": "passed" if not args.allow_incomplete and not missing_papers and not missing_blocks else "development"}
    write_json(REPO / "bin/generative_ai/build_receipt.json", report)
    print(json.dumps(report, ensure_ascii=False, indent=2))


def requests_quote(value):
    from urllib.parse import quote
    return quote(value)


def rewrite_crossrefs(value, lang, figures):
    sections = {"scope": ("scope", 1), "overview": ("overview", 2), "dimensions": ("dimensions", 3), "synthesis": ("synthesis", 4), "medical": ("medical", 5), "agenda": ("agenda", 6), "conclusion": ("conclusion", 7), "limitations": ("sec-limitations", "6.3")}
    soup = BeautifulSoup(value, "html.parser")
    for node in soup.select("a.crossref"):
        key = node.get_text()
        if key.startswith("sec:"):
            item = sections.get(key[4:])
            if item:
                node["href"] = "#" + item[0]
                node.string = str(item[1])
        elif key.startswith("fig:") and key in figures:
            node.string = figures[key]["number"]
        elif key.startswith("tab:"):
            node.string = {"coordinates": "1", "compositions": "2", "evidence": "3", "agenda": "4"}.get(key[4:], key)
        elif key.startswith("eq:"):
            node["href"] = "#prose-S05" if key.endswith("intensity") else "#prose-OV03"
            node.string = "1" if key.endswith("intensity") else "2"
    return str(soup)


if __name__ == "__main__":
    main()
