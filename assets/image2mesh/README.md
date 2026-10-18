# Image2Mesh survey page

Independent project route: `/projects/image2mesh/`, listed as **Image2Mesh**. The earlier `/projects/1_project/` page is retired by renaming its source to `_projects/1_project.md.disabled`. HeartVolMesh and all original survey media remain available. Jekyll automatically lists HeartVolMesh and Image2Mesh as the two active projects.

## Content and media

- Paper: [arXiv:2505.03599](https://arxiv.org/abs/2505.03599), first submitted 6 May 2025, `cs.CV`. The public record verified on 18 October 2026 does not supply a journal publication reference. The page cites the preprint.
- Scientific figures come from the author-provided `Deep_Learning_Based_Medical_Image_To_Mesh_Reconstruction__A_Survey.zip`. `media-manifest.json` records sources, hashes, dimensions and conversions. Transparent figures are composited onto white for legibility; PDF figures are rasterised for the browser. Scientific figures are not generated artwork.
- `taxonomy-overview.png` is the exact user-supplied PNG added on 18 October 2026. It is displayed directly beneath the interactive method explorer and can be enlarged or opened at its original resolution. No pixels were altered.
- Evidence uses `result_brain5.jpg` and `result_heart5.jpg`, referenced by the supplied manuscript. These are heterogeneous study-level summaries, not controlled head-to-head comparisons.
- All twelve original-page figures are accessible in the original figure collection, using the exact existing originals. Earlier brain/cardiac charts and the old generative completion figure are explicitly retained. The old completion PNG and newer interpolation PDF are distinct.
- The original H264/AAC overview video remains at `/assets/video/lin2025pixels/From_Pixels_to_Polygons.mp4` without modification or duplication. `video-poster.jpg` is its frame at 45 seconds. The source video has no caption track.
- The ZIP's `mainTemplatePDF.pdf` is an unrelated old LaTeX template and is intentionally not published. `taxonomy-source.pdf` is only the verified source taxonomy figure.

## Design and implementation

The design follows the media-led clarity of the [Nerfies project-page reference](https://github.com/nerfies/nerfies.github.io) without copying its code or assets. Video loading follows [web.dev's native-video guidance](https://web.dev/articles/lazy-loading-video). This page uses original HTML, CSS and small vanilla JavaScript, with no third-party runtime, font or animation dependencies.

White background, deep teal actions, ink typography, thin rules, an editorial text-only introduction, an interactive four-family/twelve-subcategory explorer, separate evidence tabs, source-figure dialogs, a native video player and BibTeX copy controls. Panel transitions respect reduced-motion preferences. Panels remain readable without JavaScript. Figure links open the source directly when dialogs are unsupported or JavaScript is unavailable.

## Validation

The production build uses the existing GitHub Pages workflow on `newsite`. No global layout, project index, Gemfile, dependency lock or existing project assets need changing.

For Windows-only local preview with installed gems, a temporary Jekyll configuration can disable ImageMagick (the plugin assumes the Unix `convert` executable) and exclude the existing notebook assets when Jupyter is unavailable. These platform overrides are never committed to the site configuration; production CI checks the full locked dependency build and normal asset processing.
