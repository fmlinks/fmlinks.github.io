/* A progressively enhanced, source-linked bilingual research reader. */
(() => {
  "use strict";
  const root = document.documentElement;
  const lang = root.lang === "zh-CN" ? "zh" : "en";
  const words = lang === "zh" ? {
    loading: "正在载入…", error: "资料暂未载入，请重试。", abstract: "摘要", original: "原始英文题名", source: "原文", copy: "复制引用", copied: "引用已复制", copyFailed: "复制失败", empty: "没有匹配的论文。", papers: "篇论文", page: "页", translation: "中文为辅助阅读译文，模型名与缩写酌情保留；原始论断属于所引论文作者。请以链接中的原文为准。", originalNote: "Abstract reproduced from the linked source; claims belong to the paper's authors.", prev: "上一篇", next: "下一篇"
  } : {
    loading: "Loading…", error: "The records could not be loaded. Please retry.", abstract: "Abstract", original: "Original title", source: "Source", copy: "Copy citation", copied: "Citation copied", copyFailed: "Could not copy", empty: "No matching papers.", papers: "papers", page: "Page", translation: "", originalNote: "Abstract from the linked source; claims belong to the paper's authors.", prev: "Previous paper", next: "Next paper"
  };
  const $ = (selector, element = document) => element.querySelector(selector);
  const $$ = (selector, element = document) => Array.from(element.querySelectorAll(selector));
  const icon = name => `<i data-lucide="${name}" class="icon" aria-hidden="true"></i>`;
  const icons = () => window.lucide?.createIcons({ attrs: { "aria-hidden": "true", class: "icon" } });
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(location.search);
  const state = { group: Math.max(1, Math.min(8, Number(params.get("dimension")) || 1)), task: Number(params.get("task")) || 1, paper: null, sequence: [], page: 0 };
  const drawer = $("#paper-dialog");
  const imageDialog = $("#image-dialog");
  let recordsPromise;
  let records = [];
  let paperMap = new Map();
  let refMap = new Map();
  let lastTrigger;
  let requestToken = 0;

  async function getRecords() {
    if (!recordsPromise) recordsPromise = fetch(`/assets/generative-ai/data/papers.${lang}.json`).then(response => {
      if (!response.ok) throw Error(String(response.status));
      return response.json();
    }).then(data => {
      records = data;
      paperMap = new Map(data.map(paper => [paper.key, paper]));
      refMap = new Map(data.map(paper => [String(paper.reference), paper.key]));
      return data;
    }).catch(error => { recordsPromise = undefined; throw error; });
    return recordsPromise;
  }

  function languageLinks() {
    const values = new URLSearchParams();
    values.set("dimension", state.group);
    values.set("task", state.task);
    if (state.paper) values.set("paper", state.paper);
    $$("[data-language]").forEach(link => {
      const path = link.dataset.language === "zh" ? "/library/generative-ai/zh/" : "/library/generative-ai/";
      link.href = `${path}?${values}${location.hash}`;
    });
  }

  function updateURL() {
    const url = new URL(location.href);
    url.searchParams.set("dimension", state.group);
    url.searchParams.set("task", state.task);
    if (state.paper) url.searchParams.set("paper", state.paper); else url.searchParams.delete("paper");
    history.replaceState(null, "", url);
    languageLinks();
  }

  function animatePanel(panel) {
    if (!reduced) panel.animate([{ opacity: .3, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 220, easing: "cubic-bezier(.2,.7,.3,1)" });
  }

  function activateGroup(index, taskIndex, animate = true) {
    state.group = index;
    $$(".dimension-tab").forEach(button => {
      const selected = Number(button.dataset.dimension) === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $$(".dimension-panel").forEach(panel => { panel.hidden = Number(panel.dataset.dimension) !== index; });
    const panel = $(`#dimension-${index}`);
    const tasks = $$(".subtask-tab", panel);
    const selected = tasks.find(button => Number(button.dataset.task) === taskIndex) || tasks[0];
    activateTask(Number(selected.dataset.task), false);
    if (animate) animatePanel(panel);
    loadVisibleTimelines(panel);
    updateURL();
  }

  function activateTask(index, animate = true) {
    state.task = index;
    const group = $(`#dimension-${state.group}`);
    $$(".subtask-tab", group).forEach(button => {
      const selected = Number(button.dataset.task) === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $$(".subtask-panel", group).forEach(panel => { panel.hidden = Number(panel.dataset.task) !== index; });
    const panel = $(`#subtask-${index}`);
    if (animate) animatePanel(panel);
    loadVisibleTimelines(panel);
    updateURL();
  }

  function keyboardTabs(event, buttons, activate, vertical) {
    const current = buttons.indexOf(event.target);
    if (current < 0) return;
    let next;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else if ([vertical ? "ArrowDown" : "ArrowRight", vertical ? "ArrowUp" : "ArrowLeft"].includes(event.key)) next = (current + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + buttons.length) % buttons.length;
    if (next === undefined) return;
    event.preventDefault();
    activate(buttons[next]);
    buttons[next].focus({ preventScroll: true });
  }

  async function loadTimeline(container) {
    if (container.dataset.loaded || container.dataset.loading) return;
    container.dataset.loading = "true";
    try {
      const response = await fetch(container.dataset.timeline);
      if (!response.ok) throw Error(String(response.status));
      const svg = await response.text();
      const parsed = new DOMParser().parseFromString(svg, "image/svg+xml");
      if (parsed.querySelector("parsererror") || parsed.documentElement.localName !== "svg") throw Error("Invalid SVG");
      parsed.querySelectorAll("script,foreignObject").forEach(node => node.remove());
      const vector = document.importNode(parsed.documentElement, true);
      container.replaceChildren(vector);
      container.dataset.loaded = "true";
    } catch (error) {
      // The existing image and20 linked publication controls remain usable.
      container.dataset.failed = "true";
    } finally { delete container.dataset.loading; }
  }

  function loadVisibleTimelines(element = document) {
    $$("[data-timeline]", element).forEach(container => {
      if (!container.closest("[hidden]") && container.closest("details")?.open) loadTimeline(container);
    });
  }

  async function openPaper(key, sequence = [], trigger = null) {
    const token = ++requestToken;
    if (!drawer.open || trigger) lastTrigger = trigger || document.activeElement;
    if (!drawer.open) drawer.showModal();
    $(".dialog-body", drawer).innerHTML = `<p role="status">${words.loading}</p>`;
    if (!reduced) drawer.animate([{ transform: "translateX(30px)", opacity: .6 }, { transform: "translateX(0)", opacity: 1 }], { duration: 240, easing: "cubic-bezier(.2,.7,.3,1)" });
    try {
      await getRecords();
      if (token !== requestToken) return;
      const paper = paperMap.get(key);
      if (!paper) throw Error("Unknown paper");
      state.paper = key;
      state.sequence = sequence.length ? sequence : records.map(p => p.key);
      if (!state.sequence.includes(key)) state.sequence = [key];
      const position = state.sequence.indexOf(key);
      $("#paper-context").textContent = `[${paper.reference}] · ${paper.date} · ${position + 1} / ${state.sequence.length}`;
      const body = $(".dialog-body", drawer);
      body.innerHTML = `<h2 id="paper-dialog-title">${escape(paper.title)}</h2><p class="paper-meta">${escape(paper.authors.join(", "))}</p>${lang === "zh" ? `<details class="original-title"><summary>${words.original}</summary><p>${escape(paper.original_title)}</p></details>` : ""}<h3>${words.abstract}</h3><div class="paper-abstract">${escape(paper.abstract)}</div><div class="paper-source"><a class="button primary" href="${escape(paper.url)}" target="_blank" rel="noopener">${words.source}${icon("arrow-up-right")}</a><button class="button" type="button" id="copy-paper">${icon("copy")}${words.copy}</button></div><p class="copy-status" aria-live="polite"></p><p class="translation-note">${lang === "zh" ? words.translation : words.originalNote}</p>`;
      if (paper.source_note) {
        const note = document.createElement("p");
        note.className = "translation-note";
        note.textContent = paper.source_note;
        body.append(note);
      }
      $("#previous-paper").disabled = position === 0;
      $("#next-paper").disabled = position >= state.sequence.length - 1;
      $$(".paper-node").forEach(node => node.classList.toggle("is-selected", node.dataset.paper === key));
      updateURL();
      icons();
      body.scrollTop = 0;
      window.MathJax?.typesetPromise?.([body]).catch(() => {});
    } catch (error) {
      if (token === requestToken) $(".dialog-body", drawer).innerHTML = `<p class="load-error" role="alert">${words.error}</p><button class="button" id="retry-paper">${lang === "zh" ? "重试" : "Retry"}</button>`;
      $("#retry-paper", drawer)?.addEventListener("click", () => openPaper(key, sequence));
    }
  }

  function sequenceFor(trigger) {
    const task = trigger.closest(".subtask-panel");
    return task ? task.dataset.paperKeys.split(",") : [];
  }

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-paper]");
    if (trigger) { event.preventDefault(); openPaper(trigger.dataset.paper, sequenceFor(trigger), trigger); return; }
    if (event.target.closest('.chapter-nav a[href="#references"]')) {
      event.preventDefault();
      $("#references").open = true;
      history.replaceState(null, "", "#references");
      languageLinks();
      $("#references").scrollIntoView({block:"start",behavior:reduced ? "instant" : "smooth"});
    }
    const crossref = event.target.closest("a.crossref");
    if (crossref?.getAttribute("href")?.startsWith("#")) {
      const target = document.getElementById(crossref.hash.slice(1));
      if (target) {
        event.preventDefault();
        const group = target.closest(".dimension-panel");
        const task = target.closest(".subtask-panel");
        if (group) activateGroup(Number(group.dataset.dimension), task ? Number(task.dataset.task) : undefined, false);
        for (let parent = target.parentElement; parent; parent = parent.parentElement) if (parent.tagName === "DETAILS") parent.open = true;
        if (group) loadVisibleTimelines(group);
        history.replaceState(null, "", crossref.hash);
        languageLinks();
        target.scrollIntoView({block:"start",behavior:reduced ? "instant" : "smooth"});
      }
    }
    const cite = event.target.closest("[data-reference]");
    if (cite) {
      event.preventDefault();
      getRecords().then(() => {
        const key = refMap.get(cite.dataset.reference);
        if (key) openPaper(key, [], cite);
        else { $(".references").open = true; $(cite.getAttribute("href"))?.scrollIntoView(); }
      }).catch(() => {});
    }
    const zoom = event.target.closest("[data-zoom]");
    if (zoom) {
      event.preventDefault();
      $("#image-caption").textContent = zoom.dataset.caption || "";
      $("#image-original").href = zoom.href;
      $("#image-zoom").src = zoom.href;
      $("#image-zoom").alt = zoom.querySelector("img")?.alt || zoom.dataset.caption || "";
      imageDialog.showModal();
    }
  });
  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".paper-node")) {
      event.preventDefault(); openPaper(event.target.dataset.paper, sequenceFor(event.target), event.target);
    }
  });
  $$(".dimension-tab").forEach(button => button.addEventListener("click", () => activateGroup(Number(button.dataset.dimension))));
  $(".dimension-tabs").addEventListener("keydown", event => keyboardTabs(event, $$(".dimension-tab"), button => activateGroup(Number(button.dataset.dimension)), true));
  $$(".subtask-tabs").forEach(tabs => {
    tabs.addEventListener("click", event => { const button = event.target.closest(".subtask-tab"); if (button) activateTask(Number(button.dataset.task)); });
    tabs.addEventListener("keydown", event => keyboardTabs(event, $$(".subtask-tab", tabs), button => activateTask(Number(button.dataset.task)), false));
  });
  $$("details").forEach(details => details.addEventListener("toggle", () => { if (details.open) loadVisibleTimelines(details); }));
  $$("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
  [drawer, imageDialog].forEach(dialog => dialog.addEventListener("click", event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  }));
  drawer.addEventListener("close", () => {
    requestToken += 1; state.paper = null; updateURL();
    if (lastTrigger?.isConnected) lastTrigger.focus?.({ preventScroll: true });
  });
  $("#previous-paper").addEventListener("click", () => { const i = state.sequence.indexOf(state.paper); if (i > 0) openPaper(state.sequence[i-1], state.sequence); });
  $("#next-paper").addEventListener("click", () => { const i = state.sequence.indexOf(state.paper); if (i < state.sequence.length-1) openPaper(state.sequence[i+1], state.sequence); });
  drawer.addEventListener("click", async event => {
    if (!event.target.closest("#copy-paper")) return;
    const p = paperMap.get(state.paper);
    try { await navigator.clipboard.writeText(`${p.authors.join(", ")}. ${p.original_title}. ${p.date.slice(0,4)}. ${p.url}`); $(".copy-status", drawer).textContent = words.copied; }
    catch { $(".copy-status", drawer).textContent = words.copyFailed; }
  });

  function filteredRecords() {
    const query = $("#paper-search").value.trim().toLocaleLowerCase();
    const year = $("#paper-year").value;
    const task = $("#paper-task").value;
    return records.filter(paper => (!year || paper.date.startsWith(year)) && (!task || paper.tasks.includes(Number(task))) && (!query || `${paper.title} ${paper.original_title} ${paper.abstract} ${paper.short_name} ${paper.authors.join(" ")} ${paper.reference}`.toLocaleLowerCase().includes(query)));
  }

  function renderCatalog() {
    const filtered = filteredRecords();
    const pages = Math.max(1, Math.ceil(filtered.length / 20));
    state.page = Math.min(state.page, pages-1);
    $("#result-count").textContent = `${filtered.length} / ${records.length} ${words.papers}`;
    const slice = filtered.slice(state.page*20, state.page*20+20);
    $("#paper-list").innerHTML = slice.length ? slice.map(paper => `<button type="button" class="paper-row" data-paper="${paper.key}"><span class="paper-ref">[${paper.reference}]</span><span class="paper-title">${escape(paper.title)}<small>${escape(paper.short_name)} · ${escape(paper.authors.slice(0,2).join(", "))}${paper.authors.length > 2 ? " et al." : ""}</small></span><time datetime="${paper.date}">${paper.date}</time>${icon("arrow-up-right")}</button>`).join("") : `<p class="empty-results">${words.empty}</p>`;
    $("#catalog-page").textContent = `${words.page} ${state.page+1} / ${pages}`;
    $("#catalog-previous").disabled = state.page === 0;
    $("#catalog-next").disabled = state.page >= pages-1;
    icons();
  }
  function initCatalog() { getRecords().then(renderCatalog).catch(() => { $("#paper-list").innerHTML = `<p class="load-error">${words.error}</p>`; }); }
  ["paper-search", "paper-year", "paper-task"].forEach(id => $("#" + id).addEventListener(id === "paper-search" ? "input" : "change", () => { state.page = 0; getRecords().then(renderCatalog).catch(() => {}); }));
  $("#catalog-previous").addEventListener("click", () => { state.page -= 1; renderCatalog(); });
  $("#catalog-next").addEventListener("click", () => { state.page += 1; renderCatalog(); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id === "papers" ? "references" : entry.target.id;
        $$(".chapter-nav a").forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + id));
      }
    });
  }, { rootMargin: "-15% 0px -60% 0px" });
  $$("main>section[id]").forEach(section => observer.observe(section));
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) requestAnimationFrame(() => {
      const range = document.documentElement.scrollHeight - innerHeight;
      $(".reading-progress").style.transform = `scaleX(${range > 0 ? scrollY/range : 0})`;
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
  root.dataset.enhanced = "true";
  activateGroup(state.group, state.task, false);
  icons();
  initCatalog();
  const initialPaper = params.get("paper");
  if (initialPaper) openPaper(initialPaper);
  if (location.hash === "#references") {
    $("#references").open = true;
    $("#references").scrollIntoView({block:"start"});
  }
})();
