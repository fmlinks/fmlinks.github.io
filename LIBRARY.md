# Maintaining the library

The library index is `_pages/library.md`, at `/library/`. It uses the same card
layout and theme as the projects page. Library entries live in the `_library/`
Jekyll collection and appear on the index automatically.

The public index starts empty, with only its title and navigation. Do not add
placeholder cards, topic pages, or introductory text before the user provides
the content.

## Add a knowledge page

1. Copy `_library/template.md.disabled` to `_library/<topic-slug>.md`.
2. Replace the title, description, topics, and body with the actual content.
3. Set a numeric `importance` to control card order (lower values appear first).
4. Put optional images under `assets/img/library/` and set `img` to their path.

For example, `_library/cardiac-simulation.md` becomes
`/library/cardiac-simulation/`. The filename controls the URL; changing the title
does not change the URL. Nested folders are supported, for example
`_library/simulation/cardiac.md` becomes `/library/simulation/cardiac/`.

The following front matter is sufficient:

```yaml
---
title: "Your topic title"
description: "A short description for the library card."
importance: 10
topics: [Medical Imaging, Simulation]
---
```

- `title` and `description` are required for a useful card.
- `importance` defaults to `100` and `topics` is an optional array. A page can
  have several topics without duplicating the source file.
- `img` is optional; cards also work without a thumbnail.
- The default layout is `library_entry`, which adds a return link to the index.
- Child pages stay out of the top navigation (`nav: false` by default), while
  the library navigation item remains active on child pages.
- The existing site search includes collection entries automatically.

Keep source links and distinguish reported findings, personal interpretation,
and results you have independently checked. Add only content the user provides
or authorizes; the disabled template is not a published knowledge entry.

## Implementation and checks

- Collection and defaults: `_config.yml`
- Index: `_pages/library.md`
- Card: `_includes/library_item.liquid`
- Child-page layout: `_layouts/library_entry.liquid`
- Navigation: publications (3), library (4), funding (5)

After adding an entry, build with `bundle exec jekyll build` and check the index,
the generated child URL, the return link, and the site search. Check a narrow
viewport if titles or images are long. `LIBRARY.md` and `*.disabled` are excluded
from the published site.
