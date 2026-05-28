---
layout: page
title: "From Pixels to Polygons"
description: "A survey of deep learning approaches for medical image-to-mesh reconstruction"
img: assets/img/paper/lin2025pixels/IST_pipeline4.png
importance: 1
category: ongoing
related_publications: true
---

<!--
Implementation notes
1) This page expects all figures under:
   assets/img/paper/lin2025pixels/
2) Figures that are PDF in the paper source should be exported to PNG or WebP for the web page:
   - content5.pdf -> content5.png
   - Generative Model 3.pdf -> Generative Model 3.png
3) The hero comparison slider currently uses the two meta-analysis figures.
   If you later generate dedicated teaser renders, just replace those two image paths.
-->

<style>
  :root {
    --px-bg: #0f172a;
    --px-bg-2: #111827;
    --px-card: rgba(15, 23, 42, 0.76);
    --px-card-2: #ffffff;
    --px-text: #eaf2ff;
    --px-muted: #b6c3da;
    --px-border: rgba(148, 163, 184, 0.22);
    --px-accent: #67e8f9;
    --px-accent-2: #60a5fa;
    --px-accent-3: #c084fc;
    --px-soft: #eef4ff;
    --px-shadow: 0 20px 55px rgba(15, 23, 42, 0.18);
  }

  .px-hero {
    position: relative;
    overflow: hidden;
    margin: 0 0 2.4rem 0;
    padding: 2rem;
    border-radius: 28px;
    color: var(--px-text);
    background:
      radial-gradient(circle at 14% 18%, rgba(96, 165, 250, 0.24), transparent 28%),
      radial-gradient(circle at 88% 22%, rgba(192, 132, 252, 0.18), transparent 26%),
      radial-gradient(circle at 78% 86%, rgba(103, 232, 249, 0.14), transparent 26%),
      linear-gradient(135deg, #0b1220 0%, #111827 52%, #0f172a 100%);
    border: 1px solid rgba(148, 163, 184, 0.18);
    box-shadow: 0 30px 80px rgba(2, 6, 23, 0.28);
  }

  .px-hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
    gap: 1.6rem;
    align-items: center;
  }

  .px-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.9rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #d7e4ff;
  }

  .px-kicker::before {
    content: "";
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--px-accent), var(--px-accent-2));
    box-shadow: 0 0 24px rgba(103, 232, 249, 0.65);
  }

  .px-title {
    margin: 0;
    font-size: clamp(2.2rem, 4.8vw, 3.6rem);
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: #f8fbff;
  }

  .px-subtitle {
    margin: 0.85rem 0 0 0;
    font-size: 1.08rem;
    line-height: 1.7;
    color: #f0f6ff;
    max-width: 60ch;
  }

  .px-authors {
    margin: 1rem 0 0 0;
    font-size: 0.98rem;
    line-height: 1.7;
    color: var(--px-muted);
  }

  .px-button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1.25rem 0 0 0;
  }

  .px-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    font-weight: 700;
    text-decoration: none !important;
    border: 1px solid rgba(148, 163, 184, 0.25);
    color: #f5fbff !important;
    background: rgba(255, 255, 255, 0.05);
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
    backdrop-filter: blur(8px);
  }

  .px-btn:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(103, 232, 249, 0.55);
  }

  .px-btn-primary {
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.22), rgba(103, 232, 249, 0.18));
    border-color: rgba(103, 232, 249, 0.45);
  }

  .px-stat-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
    margin-top: 1.4rem;
  }

  .px-stat {
    padding: 0.95rem 1rem;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(148, 163, 184, 0.16);
    backdrop-filter: blur(10px);
  }

  .px-stat-value {
    font-size: 1.55rem;
    font-weight: 800;
    line-height: 1;
    color: #ffffff;
  }

  .px-stat-label {
    margin-top: 0.35rem;
    font-size: 0.88rem;
    color: var(--px-muted);
  }

  .px-compare-card {
    padding: 1rem;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(148, 163, 184, 0.18);
    backdrop-filter: blur(12px);
  }

  .px-compare-title {
    margin: 0 0 0.65rem 0;
    font-size: 0.96rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #eaf5ff;
  }

  .px-compare {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid rgba(148, 163, 184, 0.16);
    background: #ffffff;
    aspect-ratio: 1.62 / 1;
  }

  .px-compare img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    pointer-events: none;
  }

  .px-compare-overlay {
    position: absolute;
    inset: 0 auto 0 0;
    width: 54%;
    overflow: hidden;
  }

  .px-compare-divider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 54%;
    width: 2px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.24);
    transform: translateX(-1px);
  }

  .px-compare-divider::after {
    content: "↔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    color: #0f172a;
    font-weight: 800;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.22);
  }

  .px-compare-chip {
    position: absolute;
    top: 0.9rem;
    z-index: 3;
    padding: 0.45rem 0.72rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #f8fbff;
    background: rgba(15, 23, 42, 0.62);
    border: 1px solid rgba(226, 232, 240, 0.18);
    backdrop-filter: blur(8px);
  }

  .px-compare-chip-left { left: 0.9rem; }
  .px-compare-chip-right { right: 0.9rem; }

  .px-compare input[type="range"] {
    position: absolute;
    inset: auto 1rem 1rem 1rem;
    z-index: 4;
    width: calc(100% - 2rem);
    background: transparent;
  }

  .px-compare-caption {
    margin: 0.8rem 0 0 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--px-muted);
  }

  .px-section-title {
    margin: 2.65rem 0 0.85rem 0;
    font-size: clamp(1.55rem, 2.6vw, 2.1rem);
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #0f172a;
  }

  .px-section-note {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    line-height: 1.75;
    color: #475569;
  }

  .px-callout {
    margin: 1.35rem 0 0 0;
    padding: 1rem 1.15rem;
    border-radius: 18px;
    border: 1px solid rgba(96, 165, 250, 0.22);
    background: linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(248, 250, 252, 0.95));
    color: #0f172a;
    box-shadow: var(--px-shadow);
  }

  .px-callout strong {
    color: #0f172a;
  }

  .px-grid-2,
  .px-grid-3,
  .px-grid-4 {
    display: grid;
    gap: 1.15rem;
    align-items: start;
  }

  .px-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .px-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .px-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

  .px-card,
  .px-method-card {
    background: #ffffff;
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 22px;
    box-shadow: var(--px-shadow);
  }

  .px-card {
    padding: 1rem;
  }

  .px-card img {
    width: 100%;
    display: block;
    border-radius: 16px;
  }

  .px-card-caption {
    margin: 0.8rem 0 0 0;
    font-size: 0.93rem;
    line-height: 1.65;
    color: #475569;
  }

  .px-method-card {
    padding: 1.1rem 1.15rem;
    background:
      radial-gradient(circle at 100% 0%, rgba(191, 219, 254, 0.32), transparent 32%),
      linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  }

  .px-method-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #2563eb;
    background: rgba(219, 234, 254, 0.85);
    border: 1px solid rgba(147, 197, 253, 0.9);
  }

  .px-method-card h3 {
    margin: 0.8rem 0 0.45rem 0;
    font-size: 1.1rem;
    line-height: 1.3;
    color: #0f172a;
  }

  .px-method-card p,
  .px-method-card li,
  .px-rich-text p,
  .px-rich-text li {
    color: #475569;
    line-height: 1.72;
    font-size: 0.98rem;
  }

  .px-method-card ul,
  .px-rich-text ul {
    margin: 0.55rem 0 0 1.15rem;
  }

  .px-rich-text p {
    margin: 0 0 0.95rem 0;
  }

  .px-mini-list {
    display: grid;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .px-mini-item {
    padding: 0.8rem 0.95rem;
    border-radius: 16px;
    background: #f8fbff;
    border: 1px solid rgba(203, 213, 225, 0.8);
    color: #334155;
  }

  .px-pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.35rem;
  }

  .px-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 0.78rem;
    border-radius: 999px;
    font-size: 0.84rem;
    font-weight: 700;
    color: #334155;
    background: #f8fafc;
    border: 1px solid rgba(203, 213, 225, 0.88);
  }

  .px-rank {
    display: inline-block;
    padding: 0.65rem 0.8rem;
    margin: 0.25rem 0 0.45rem 0;
    border-radius: 16px;
    font-weight: 800;
    line-height: 1.5;
    color: #0f172a;
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.18), rgba(96, 165, 250, 0.18));
    border: 1px solid rgba(103, 232, 249, 0.35);
  }

  .px-video-frame {
    overflow: hidden;
    border-radius: 20px;
    background: #020617;
    aspect-ratio: 16 / 9;
    border: 1px solid rgba(148, 163, 184, 0.18);
  }

  .px-video-frame video {
    display: block;
    width: 100%;
    height: 100%;
    background: #020617;
  }

  .px-video-note {
    display: none;
    margin: 0.95rem 0 0 0;
    padding: 0.9rem 1rem;
    border-radius: 16px;
    border: 1px solid rgba(251, 146, 60, 0.28);
    background: #fff7ed;
    color: #9a3412;
    line-height: 1.65;
  }

  .px-video-note.is-visible {
    display: block;
  }

  .px-citation details,
  .px-citation {
    margin-top: 1rem;
  }

  .px-citation summary {
    cursor: pointer;
    list-style: none;
    font-weight: 800;
    color: #0f172a;
  }

  .px-citation summary::-webkit-details-marker { display: none; }

  .px-citation pre {
    margin: 0.85rem 0 0 0;
    padding: 1rem;
    overflow-x: auto;
    border-radius: 18px;
    background: #0f172a;
    color: #e5eefb;
    border: 1px solid rgba(30, 41, 59, 0.9);
  }

  @media (max-width: 1100px) {
    .px-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .px-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 920px) {
    .px-hero-grid,
    .px-grid-2,
    .px-grid-3 {
      grid-template-columns: minmax(0, 1fr);
    }

    .px-stat-row {
      grid-template-columns: minmax(0, 1fr);
    }

    .px-hero {
      padding: 1.35rem;
      border-radius: 22px;
    }
  }

  @media (max-width: 620px) {
    .px-grid-4 {
      grid-template-columns: minmax(0, 1fr);
    }

    .px-title {
      font-size: 2.2rem;
    }

    .px-btn {
      width: 100%;
    }
  }
</style>

<div class="px-hero">
  <div class="px-hero-grid">
    <div>
      <div class="px-kicker">Medical Image Analysis · Survey</div>
      <h1 class="px-title">From Pixels to Polygons</h1>
      <p class="px-subtitle">
        A visual survey of deep learning approaches that reconstruct anatomical meshes directly from medical images, bridging imaging, geometric modelling, and simulation-ready digital anatomy.
      </p>
      <p class="px-authors">
        Fengming Lin, Arezoo Zakeri, Yidan Xue, Michael MacRaild, Haoran Dou, Zherui Zhou,
        Ziwei Zou, Ali Sarrami-Foroushani, Jinming Duan, Alejandro F. Frangi*
      </p>

      <div class="px-button-row">
        <a class="px-btn px-btn-primary" href="https://arxiv.org/abs/2505.03599" target="_blank" rel="noopener">arXiv</a>
        <a class="px-btn" href="https://arxiv.org/pdf/2505.03599" target="_blank" rel="noopener">PDF</a>
        <a class="px-btn" href="#project-video">Video</a>
        <a class="px-btn" href="https://research.manchester.ac.uk/en/publications/from-pixels-to-polygons-a-survey-of-deep-learning-approaches-for-" target="_blank" rel="noopener">Research Record</a>
      </div>

      <div class="px-stat-row">
        <div class="px-stat">
          <div class="px-stat-value">4</div>
          <div class="px-stat-label">method families</div>
        </div>
        <div class="px-stat">
          <div class="px-stat-value">12</div>
          <div class="px-stat-label">subcategories</div>
        </div>
        <div class="px-stat">
          <div class="px-stat-value">3</div>
          <div class="px-stat-label">core challenge axes</div>
        </div>
      </div>
    </div>

    <div class="px-compare-card">
      <p class="px-compare-title">Drag to compare benchmark landscapes</p>

      <div class="px-compare" data-compare>
        <img
          src="{{ '/assets/img/paper/lin2025pixels/result_brain3.png' | relative_url }}"
          alt="Brain MR reconstruction benchmark summary"
          loading="eager"
        />
        <div class="px-compare-overlay">
          <img
            src="{{ '/assets/img/paper/lin2025pixels/result_heart2.png' | relative_url }}"
            alt="Cardiac MR reconstruction benchmark summary"
            loading="eager"
          />
        </div>
        <div class="px-compare-divider"></div>
        <div class="px-compare-chip px-compare-chip-left">Brain MR</div>
        <div class="px-compare-chip px-compare-chip-right">Cardiac MR</div>
        <input type="range" min="0" max="100" value="54" aria-label="Image comparison slider" />
      </div>

      <p class="px-compare-caption">
        A Neuralangelo-style comparison block for this project page: move the slider between the cortical and cardiac meta-analysis figures.
      </p>
    </div>
  </div>
</div>

<h2 class="px-section-title" id="project-video">Project video</h2>
<p class="px-section-note">
  A short overview of the survey. The embedded player keeps the browser's native controls enabled so visitors can drag the progress bar, adjust volume, and switch to fullscreen.
</p>

<div class="px-card">
  <div class="px-video-frame">
    <video
      id="px-project-video"
      autoplay
      controls
      playsinline
      preload="auto"
      poster="{{ '/assets/img/paper/lin2025pixels/IST_pipeline4.png' | relative_url }}"
    >
      <source
        src="{{ '/assets/video/lin2025pixels/From_Pixels_to_Polygons.mp4' | relative_url }}"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>
  <p class="px-card-caption">
    <strong>Overview video.</strong>
    The video is configured to attempt autoplay on page load and keeps the native controls enabled for seeking.
  </p>
  <div class="px-video-note" id="px-video-note">
    Autoplay with sound may be blocked by some browsers. If that happens, press play once and the video will continue normally with audio.
  </div>
</div>

<div class="px-callout">
  <strong>At a glance.</strong>
  The survey organizes end-to-end medical image-to-mesh reconstruction into four paradigms—template models,
  statistical shape models, generative models, and implicit models—then links these families to
  losses, evaluation metrics, public datasets, clinical use cases, and open research problems.
</div>

<h2 class="px-section-title">Why image-to-mesh reconstruction matters</h2>
<p class="px-section-note">
  In computational medicine and in-silico trials, image-to-mesh reconstruction is the bridge between medical imaging and numerical simulation.
  The paper emphasizes a shift from segmentation-heavy pipelines toward models that directly predict geometrically meaningful mesh representations from CT, MR, ultrasound, projections, or sparse point observations.
</p>

<div class="px-grid-2">
  <div class="px-rich-text">
    <p>
      Patient-specific meshes are more than a visualization layer. They are the structural backbone for downstream tasks such as
      hemodynamic simulation, structural mechanics, virtual device testing, motion analysis, and digital twin generation.
      When mesh quality is poor, simulation quality suffers too.
    </p>
    <p>
      That is why the survey treats reconstruction as a full pipeline problem:
      input modality, representation, topology, regularization, and evaluation all matter.
      The most compelling methods are not only accurate against ground truth, but also stable, anatomically plausible, and ready for computation.
    </p>

    <div class="px-mini-list">
      <div class="px-mini-item"><strong>Inputs:</strong> CT, MR, ultrasound, 2D projections, sparse contours, point clouds, and videos.</div>
      <div class="px-mini-item"><strong>Outputs:</strong> Surface meshes, point clouds, implicit fields, and simulation-ready geometric models.</div>
      <div class="px-mini-item"><strong>Applications:</strong> Heart, cortex, vessels, abdominal organs, skull repair, endoscopy, and fetal imaging.</div>
    </div>
  </div>

  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/IST_pipeline4.png' | relative_url }}"
      alt="In-silico trial pipeline for image-to-mesh reconstruction"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>In-silico trial pipeline.</strong>
      Medical images feed reconstruction, generation, and simulation stages. This figure captures why anatomical meshing matters beyond segmentation: it is the geometric substrate for downstream evidence generation.
    </p>
  </div>
</div>

<h2 class="px-section-title">Survey map</h2>
<p class="px-section-note">
  The paper provides a unified taxonomy that connects methodology, input modality, output representation, and evaluation strategy.
  It also makes the field easier to navigate by splitting it into four families and twelve subcategories.
</p>

<div class="px-card">
  <img
    src="{{ '/assets/img/paper/lin2025pixels/content5.png' | relative_url }}"
    alt="Taxonomy of deep learning medical image to mesh reconstruction"
    loading="lazy"
  />
  <p class="px-card-caption">
    <strong>Taxonomy of the field.</strong>
    Template models, statistical shape models, generative models, and implicit models are connected to input type, feature representation, output form, and evaluation design.
  </p>
</div>

<div class="px-grid-4" style="margin-top: 1.15rem;">
  <div class="px-method-card">
    <div class="px-method-tag">Template</div>
    <h3>Template models</h3>
    <p>Start from an initial mesh and learn how to deform it into the target anatomy.</p>
    <ul>
      <li>Strong control over topology</li>
      <li>Good fit for stable anatomical priors</li>
      <li>Conditioned deformation and registration variants</li>
    </ul>
  </div>

  <div class="px-method-card">
    <div class="px-method-tag">SSM</div>
    <h3>Statistical shape models</h3>
    <p>Use low-dimensional shape priors to constrain reconstruction around plausible anatomical variation.</p>
    <ul>
      <li>Linear and non-linear latent spaces</li>
      <li>Robustness to noisy data</li>
      <li>Especially useful when strong population priors exist</li>
    </ul>
  </div>

  <div class="px-method-card">
    <div class="px-method-tag">Generative</div>
    <h3>Generative models</h3>
    <p>Synthesize shapes directly from data distributions rather than relying on a fixed template.</p>
    <ul>
      <li>VAE, GAN, interpolation, and diffusion families</li>
      <li>Adapt well to diverse or pathological shapes</li>
      <li>Useful when completion or synthesis matters</li>
    </ul>
  </div>

  <div class="px-method-card">
    <div class="px-method-tag">Implicit</div>
    <h3>Implicit models</h3>
    <p>Represent anatomy through continuous functions such as SDFs, occupancy fields, Neural ODEs, or NeRF-style densities.</p>
    <ul>
      <li>High-resolution and continuous surfaces</li>
      <li>Flexible topology</li>
      <li>Strong overall robustness in the meta-analysis</li>
    </ul>
  </div>
</div>
<h2 class="px-section-title">Representative formulations</h2>
<p class="px-section-note">
  Rather than showing every method in the paper, the page highlights a compact set of schematics that capture how the main families are typically formulated.
</p>

<div class="px-grid-2">
  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/Deformation%20Model%1.png' | relative_url }}"
      alt="Conditioned deformation model schematic"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>Conditioned deformation.</strong>
      CNN features are transferred to a graph network that deforms a template mesh while preserving a known topological scaffold.
    </p>
  </div>

  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/Deformation%20Model%4.png' | relative_url }}"
      alt="Template based registration schematic"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>Template-based registration.</strong>
      A learned deformation field aligns a template representation with the target anatomy, connecting image registration and mesh generation.
    </p>
  </div>
</div>

<div class="px-grid-2" style="margin-top: 1.15rem;">
  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/SSM1.png' | relative_url }}"
      alt="Linear statistical shape model schematic"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>Linear SSM.</strong>
      A PCA/SVD block predicts coefficients in a low-dimensional statistical basis, turning image evidence into a structured shape prior.
    </p>
  </div>

  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/SSM2.png' | relative_url }}"
      alt="Non-Linear statistical shape model schematic"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>Non-Linear SSM.</strong>
      A deep encoder predicts coefficients in a low-dimensional statistical basis, turning image evidence into a structured shape prior.
    </p>
  </div>
</div>

<div class="px-grid-2" style="margin-top: 1.15rem;">
  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/Generative%20Model%203.png' | relative_url }}"
      alt="Generative completion based mesh reconstruction schematic"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>Completion-based generative model.</strong>
      Sparse contours or points are densified into complete point clouds before meshing, making generative completion central to reconstruction.
    </p>
  </div>

  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/Implicit%202.png' | relative_url }}"
      alt="Neural ODE based implicit reconstruction schematic"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>Implicit flow / Neural ODE.</strong>
      Continuous deformation dynamics provide smooth trajectories and strong geometric regularity for complex anatomical surfaces.
    </p>
  </div>
</div>



<h2 class="px-section-title">What the survey finds</h2>
<p class="px-section-note">
  The meta-analysis compares method categories on cardiac and cortical benchmarks. The key message is not that one family always wins,
  but that different families dominate under different anatomical and geometric constraints.
</p>

<div class="px-grid-2">
  <div class="px-method-card">
    <div class="px-method-tag">Meta-analysis</div>
    <h3>Relative trend across the reviewed studies</h3>
    <p class="px-rank">Implicit models &gt; Generative models &gt; Statistical shape models &gt; Template models</p>
    <p>
      The paper frames this as a <em>relative</em> trend rather than an absolute rule. Anatomy, modality, topology,
      supervision, and simulation requirements can still change which model family is best for a specific task.
    </p>
  </div>

  <div class="px-method-card">
    <div class="px-method-tag">Trade-offs</div>
    <h3>Why the ranking is not the whole story</h3>
    <ul>
      <li><strong>Template:</strong> controlled topology and simulation-friendly priors</li>
      <li><strong>SSM:</strong> strong regularization from population anatomy</li>
      <li><strong>Generative:</strong> flexibility for diverse and pathological shapes</li>
      <li><strong>Implicit:</strong> continuous, high-resolution, topology-flexible surfaces</li>
    </ul>
  </div>
</div>

<div class="px-pill-row" style="margin-top: 1rem;">
  <span class="px-pill">Cardiac MR / CT / echo</span>
  <span class="px-pill">Cortical MR</span>
  <span class="px-pill">Thoracic and abdominal CT</span>
  <span class="px-pill">Vascular ultrasound and angiography</span>
  <span class="px-pill">Skull and musculoskeletal CT</span>
  <span class="px-pill">Endoscopic reconstruction</span>
</div>
<h2 class="px-section-title">Metrics, datasets, and evidence base</h2>
<p class="px-section-note">
  One strength of the survey is that it does not stop at method taxonomy.
  It also systematizes the losses, evaluation metrics, and public datasets that shape experimental practice in this field.
</p>

<div class="px-grid-2">
  <div class="px-card">
    <img
      src="{{ '/assets/img/paper/lin2025pixels/PRIMAv1.png' | relative_url }}"
      alt="PRISMA review process figure"
      loading="lazy"
    />
    <p class="px-card-caption">
      <strong>PRISMA-guided review process.</strong>
      The survey follows a systematic review structure to define inclusion, screening, and analysis.
    </p>
  </div>

  <div>
    <div class="px-method-card">
      <div class="px-method-tag">Evaluation</div>
      <h3>Metrics span geometry, topology, and function</h3>
      <ul>
        <li><strong>Shape similarity:</strong> Chamfer, Hausdorff, ASSD, MSD, Dice, IoU, normal consistency</li>
        <li><strong>Regularization:</strong> smoothness, curvature, self-intersection, topology, edge quality</li>
        <li><strong>Functional utility:</strong> ejection fraction, disease prediction, CFD velocity, kinetic energy</li>
        <li><strong>Efficiency:</strong> inference time and simulation readiness</li>
      </ul>
    </div>

    <div class="px-method-card" style="margin-top: 1rem;">
      <div class="px-method-tag">Coverage</div>
      <h3>Datasets span many organs and modalities</h3>
      <p>
        The paper curates datasets across cardiac imaging, brain MRI, thoracic and abdominal CT,
        skull reconstruction, endoscopy, microscopy, fetal ultrasound, and more.
        That breadth is valuable because it connects reconstruction design choices to anatomy and clinical use.
      </p>
    </div>
  </div>
</div>

<h2 class="px-section-title">Open challenges and future directions</h2>
<p class="px-section-note">
  The field is moving toward higher-fidelity, more topology-aware, and more simulation-ready reconstruction.
  The paper frames the future around a few central tensions: topology, geometric fidelity, multi-modality, and computational usability.
</p>

<div class="px-card">
  <img
    src="{{ '/assets/img/paper/lin2025pixels/challenges.png' | relative_url }}"
    alt="Challenges for medical image to mesh reconstruction"
    loading="lazy"
  />
  <p class="px-card-caption">
    <strong>Challenge map.</strong>
    Topological requirements, geometric accuracy, and multi-modality integration determine which reconstruction strategy is most appropriate for a given medical task.
  </p>
</div>

<div class="px-grid-3" style="margin-top: 1.15rem;">
  <div class="px-method-card">
    <div class="px-method-tag">Topology</div>
    <h3>Mesh validity still matters</h3>
    <p>
      Simulation-ready models require connectivity, manifoldness, and low self-intersection,
      especially for anatomy where downstream solvers are sensitive to geometric artifacts.
    </p>
  </div>

  <div class="px-method-card">
    <div class="px-method-tag">Fidelity</div>
    <h3>Fine detail is clinically meaningful</h3>
    <p>
      Thin walls, folds, bifurcations, and device-relevant structures push models toward higher-resolution and more continuous representations.
    </p>
  </div>

  <div class="px-method-card">
    <div class="px-method-tag">Fusion</div>
    <h3>Multi-modal and dynamic data are rising</h3>
    <p>
      CT, MR, ultrasound, sparse views, and time-varying sequences increasingly need to be integrated into a single reconstruction framework.
    </p>
  </div>
</div>

<div class="px-callout">
  <strong>Looking ahead.</strong>
  The survey points toward higher-fidelity implicit reconstruction, stronger topology-aware training,
  multi-modal fusion, volume mesh generation for biomechanics, and the transfer of fast neural surface reconstruction ideas into medical imaging.
</div>

<h2 class="px-section-title">Citation</h2>
<div class="px-citation">
  <details>
    <summary>Show BibTeX</summary>
    <pre><code>@article{lin2026pixels,
  title   = {From Pixels to Polygons: A Survey of Deep Learning Approaches for Medical Image-to-Mesh Reconstruction},
  author  = {Lin, Fengming and Zakeri, Arezoo and Xue, Yidan and MacRaild, Michael and Dou, Haoran and Zhou, Zherui and Zou, Ziwei and Sarrami-Foroushani, Ali and Duan, Jinming and Frangi, Alejandro F.},
  journal = {Medical Image Analysis},
  year    = {2026}
}</code></pre>
  </details>
</div>

<script>
  document.querySelectorAll('[data-compare]').forEach(function (root) {
    const range = root.querySelector('input[type="range"]');
    const overlay = root.querySelector('.px-compare-overlay');
    const divider = root.querySelector('.px-compare-divider');

    function update(value) {
      overlay.style.width = value + '%';
      divider.style.left = value + '%';
    }

    update(range.value);
    range.addEventListener('input', function (e) {
      update(e.target.value);
    });
  });

  (function () {
    const video = document.getElementById('px-project-video');
    const note = document.getElementById('px-video-note');

    if (!video) return;

    function showNote() {
      if (note) {
        note.classList.add('is-visible');
      }
    }

    function hideNote() {
      if (note) {
        note.classList.remove('is-visible');
      }
    }

    function tryPlay() {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(function () {
          hideNote();
        }).catch(function () {
          showNote();
        });
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryPlay, { once: true });
    } else {
      tryPlay();
    }

    video.addEventListener('canplay', tryPlay, { once: true });
    video.addEventListener('play', hideNote);

    ['pointerdown', 'touchstart', 'keydown'].forEach(function (eventName) {
      window.addEventListener(eventName, tryPlay, { once: true });
    });
  })();
</script>