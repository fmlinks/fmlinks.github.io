# Generative AI Library Edition

The generated pages and all runtime assets are committed. GitHub Pages uses the
normal repository Jekyll build; Python is not required in deployment.

## Source Contract

- Frozen manuscript: `GenerativeAI/manuscript/compact_v8`, dated 22 October 2026.
- Seven chapters, 87 prose anchors, 38 figures, four tables, 421 references.
- 27 timelines, 20 entries each: 540 memberships and 383 distinct publications.
- Statistical atlas: 25,056 arXiv title/abstract records, including 7,019 from
  2026 YTD retrieved 21 October. Timeline cutoff: 22 October.
- 383 complete source abstracts and AI-assisted Chinese translations. These are
  source authors' claims, not 383 independent full-text or clinical reviews.
- The existing review contains 54 selected full-text passage checks from a
  purposive evidence set. Publishing the website does not expand that depth.
- DreamMat's official arXiv abstract starts with an incomplete sentence. The
  website preserves it and discloses the source defect rather than filling it in.

The authoring workspace is separate from this repository:
`C:/lfm/code/survey/survey/GenerativeAI/research/library_site_v9`.
It holds article exports, translations, raw source supplements, independent
translation review reports, Chinese figure sources and geometry receipts.
The frozen manuscript and earlier versions are not modified by the website build.

## Regeneration

Run with the existing Conda `survey` interpreter. Python dependencies include
BeautifulSoup, bibtexparser, Jinja2, Pillow, pylatexenc and PyYAML.

```powershell
python -X utf8 bin/generative_ai/build.py --project C:/lfm/code/survey/survey/GenerativeAI
python -X utf8 bin/generative_ai/validate_content.py
```

Chinese graphics are redrawn using the project's
`scripts/render_library_zh_figures.py`, following `fengming-figure`: fixed
20/24-point source type, measured CJK wrapping, black timeline arrows,
unchanged data and node identities. Diagram and timeline language editions use
their own measured geometry; text is not pasted over the English raster images.

`build.py` requires the local authoring workspace and bundled Lucide package
location explicitly shown in the script. It does not claim standalone manuscript
regeneration from a clean website clone. Committed HTML/SVG/JSON/PDF/ZIP files
remain sufficient to build and serve the complete site.

## Verification

```powershell
python -X utf8 bin/generative_ai/preview.py --output C:/path/out/jekyll_preview
node bin/generative_ai/test_site.cjs C:/path/out/jekyll_preview C:/path/out/browser_qa
```

The local Windows preview keeps responsive-image template output enabled, but
sets ImageMagick input directories to an empty list and excludes the legacy
Jupyter notebook because those native helpers are unavailable in this runtime.
The three WebP card variants are generated explicitly by `build.py`, including
the shared figure helper's retained `.webp-480.webp` naming convention.
The preview does not change `_config.yml` or the production workflow. The
GitHub Pages workflow remains the authoritative full production build.

Browser tests use Chrome through Playwright, exercise all 1,080 language-specific
timeline memberships against exact full title/abstract strings, test keyboard
activation, filters, pagination, language state, dialogs, image zoom, and desktop
and mobile widths. A separate pass loads real MathJax. Test screenshots and the
browser receipt stay in the authoring workspace rather than the public site.

## Design

The existing Image2Mesh page informs the two-level research explorer. Motion,
React Bits, Uiverse and Aceternity UI were inspected as visual references:

- https://motion.dev/
- https://reactbits.dev/
- https://uiverse.io/
- https://ui.aceternity.com/

The implementation uses native CSS, Web Animations and accessible HTML controls,
not copied components or a React migration. Similar graphics can collapse while
the selected task's explanation remains visible. Source SVG labels themselves
are keyboard-accessible paper buttons, with a parallel text list for mobile.
All runtime Lucide icons are bundled with their license.
