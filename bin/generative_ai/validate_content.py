"""Check generated language editions, source coverage, assets and provenance."""
import hashlib
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "assets/generative-ai"


def main():
    report = {"status": "passed", "languages": {}, "sha256": {}}
    paper_sets = []
    for lang, file in [("en", "_library/generative-ai.html"), ("zh", "_pages/generative-ai-zh.html")]:
        soup = BeautifulSoup((ROOT / file).read_text(encoding="utf-8").split("---", 2)[2], "html.parser")
        ids = [n["id"] for n in soup.select("[id]")]
        assert len(ids) == len(set(ids)), "Duplicate HTML ids"
        assert len(soup.select("[data-prose]")) == 87
        assert len(soup.select(".table-wrap table")) == 4
        assert len(soup.select(".source-figure")) == 38
        assert len(soup.select(".timeline-buttons button")) == 540
        assert len(soup.select(".reference-list li")) == 421
        assert not re.search(r"(?:fig|tab|eq|sec):[a-z_]", soup.get_text(" "))
        assert "g r a p h i c s" not in soup.get_text()
        for a in soup.select('a[href^="#"]'):
            assert a["href"][1:] in ids, (file, a["href"])
        for img in soup.select("img[src]"):
            assert (ROOT / img["src"].lstrip("/")).is_file()
        papers = json.loads((ASSETS / f"data/papers.{lang}.json").read_text(encoding="utf-8"))
        keys = {p["key"] for p in papers}
        assert len(keys) == len(papers) == 383
        paper_sets.append(keys)
        for p in papers:
            assert p["title"].strip() and p["abstract"].strip() and p["url"].startswith("https://")
            assert "this https URL" not in p["abstract"]
        timelines = 0
        for svg in (ASSETS / "figures" / lang).glob("*.svg"):
            tree = ET.parse(svg)
            if lang == "zh":
                assert tree.getroot().get("data-language") == "zh", svg
            nodes = [g for g in tree.iter() if g.get("class") == "paper-node"]
            if nodes:
                assert len(nodes) == len({g.get("data-paper") for g in nodes}) == 20
                assert all(n.get("role") == "button" and n.get("tabindex") == "0" and n.get("data-paper") in keys for n in nodes)
                timelines += 1
        assert timelines == 27
        assert len(list((ASSETS / "figures" / lang).glob("*.svg"))) == 38
        report["languages"][lang] = {"prose": 87, "figures": 38, "tables": 4, "references": 421, "papers": 383, "timeline_positions": 540}
    assert paper_sets[0] == paper_sets[1]
    for file in sorted(ASSETS.rglob("*")):
        if file.is_file():
            report["sha256"][file.relative_to(ROOT).as_posix()] = hashlib.sha256(file.read_bytes()).hexdigest()
    target = Path(__file__).parent / "content_validation.json"
    target.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: v for k, v in report.items() if k != "sha256"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
