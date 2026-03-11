---
layout: page
title: "HeartVolMesh"
description: "Cardiac Volumetric Mesh Reconstruction via Covariance-Guided Graph Deformation"
img: assets/img/paper/lin2026heartvolmesh/GGS_MICCAI30.png
importance: 1
category: ongoing
related_publications: true
---

<style>
.hvm-hero {
  margin: 0 0 1.75rem 0;
  padding: 1.5rem 1.5rem 1.25rem 1.5rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.14), transparent 32%),
    radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.10), transparent 28%),
    var(--global-card-bg-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
}

.hvm-kicker {
  margin-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--global-theme-color);
}

.hvm-tagline {
  margin: 0 0 0.9rem 0;
  font-size: 1.15rem;
  line-height: 1.65;
}

.hvm-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.75rem;
}

.hvm-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.36rem 0.78rem;
  border-radius: 999px;
  border: 1px solid var(--global-divider-color);
  background: rgba(127, 127, 127, 0.08);
  font-size: 0.88rem;
  line-height: 1;
}

.hvm-note {
  margin: 1rem 0 1.5rem 0;
  padding: 0.95rem 1rem;
  border-left: 4px solid var(--global-theme-color);
  border-radius: 0 14px 14px 0;
  background: rgba(127, 127, 127, 0.07);
}

.hvm-card {
  padding: 1rem 1.05rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  background: var(--global-card-bg-color);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.04);
  margin-bottom: 0.9rem;
}

.hvm-card h3,
.hvm-card h4 {
  margin-top: 0;
  margin-bottom: 0.45rem;
}

.hvm-card p:last-child,
.hvm-card ul:last-child {
  margin-bottom: 0;
}

.hvm-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.5rem 0;
}

.hvm-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.5rem 0;
}

.hvm-step {
  position: relative;
  padding: 1.15rem 1.05rem 1rem 1.05rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(127, 127, 127, 0.04), rgba(127, 127, 127, 0.01)),
    var(--global-card-bg-color);
}

.hvm-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  margin-bottom: 0.75rem;
  border-radius: 999px;
  background: var(--global-theme-color);
  color: #fff;
  font-weight: 800;
  font-size: 0.9rem;
  line-height: 1;
}

.hvm-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.5rem 0;
}

.hvm-stat {
  padding: 1.05rem 1rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  background:
    radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.10), transparent 30%),
    var(--global-card-bg-color);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.04);
}

.hvm-stat-value {
  font-size: 1.9rem;
  line-height: 1;
  font-weight: 800;
  color: var(--global-theme-color);
}

.hvm-stat-label {
  margin-top: 0.45rem;
  font-weight: 700;
}

.hvm-stat-detail {
  margin-top: 0.3rem;
  color: var(--global-text-color-light);
  font-size: 0.92rem;
}

.hvm-mini-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0.75rem 0 0 0;
  font-size: 0.95rem;
}

.hvm-mini-table th,
.hvm-mini-table td {
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid var(--global-divider-color);
  text-align: left;
  vertical-align: top;
}

.hvm-mini-table thead th {
  background: rgba(127, 127, 127, 0.07);
  font-weight: 700;
}

.hvm-mini-table tbody tr:last-child td {
  border-bottom: 0;
}

.hvm-compare-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.5rem 0;
}

.hvm-compare-card {
  padding: 1rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 20px;
  background: var(--global-card-bg-color);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.04);
}

.hvm-compare-title {
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.hvm-compare {
  --position: 62%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--global-divider-color);
  background: rgba(127, 127, 127, 0.08);
}

.hvm-compare-base,
.hvm-compare-overlay img {
  display: block;
  width: 100%;
  height: auto;
}

.hvm-compare-overlay {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, var(--position) 0, var(--position) 100%, 0 100%);
}

.hvm-compare-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--position);
  width: 2px;
  transform: translateX(-1px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 0 18px rgba(0, 0, 0, 0.16);
  pointer-events: none;
}

.hvm-compare-divider::before {
  content: "⇆";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 42px;
  height: 42px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 1px solid var(--global-divider-color);
  background: var(--global-card-bg-color);
  color: var(--global-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);
}

.hvm-compare-label {
  position: absolute;
  top: 12px;
  z-index: 2;
  padding: 0.32rem 0.68rem;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.74);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  backdrop-filter: blur(8px);
  pointer-events: none;
}

.hvm-compare-label.hvm-left {
  left: 12px;
}

.hvm-compare-label.hvm-right {
  right: 12px;
}

.hvm-compare-range {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: col-resize;
  z-index: 3;
}

.hvm-compare-range::-webkit-slider-runnable-track {
  height: 100%;
  background: transparent;
  border: none;
}

.hvm-compare-range::-moz-range-track {
  height: 100%;
  background: transparent;
  border: none;
}

.hvm-compare-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 44px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: col-resize;
}

.hvm-compare-range::-moz-range-thumb {
  width: 44px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: col-resize;
}

.hvm-compare-caption {
  margin: 0.75rem 0 0 0;
  font-size: 0.92rem;
  color: var(--global-text-color-light);
}

.hvm-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}

.hvm-optional {
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px dashed var(--global-divider-color);
  background: rgba(127, 127, 127, 0.05);
  font-size: 0.95rem;
}

.hvm-tight ul {
  margin-bottom: 0;
}

@media (max-width: 1080px) {
  .hvm-grid-3,
  .hvm-metrics,
  .hvm-compare-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .hvm-grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="hvm-hero">
  <div class="hvm-kicker">MICCAI 2026 · Review Version</div>
  <p class="hvm-tagline">
    From 3D CTA volumes to simulation-ready tetrahedral heart meshes:
    <strong>HeartVolMesh</strong> combines covariance-guided graph deformation with
    template-driven volumetric warping to preserve topology, correspondence, and
    downstream simulation utility.
  </p>
  <div class="hvm-chip-row">
    <span class="hvm-chip">Cardiac digital twins</span>
    <span class="hvm-chip">Image-to-mesh learning</span>
    <span class="hvm-chip">3D CNN + GNN</span>
    <span class="hvm-chip">Covariance-guided deformation</span>
    <span class="hvm-chip">Tetrahedral volumetric meshing</span>
  </div>
</div>

<div class="hvm-note">
  <strong>Note.</strong> This page is written against the anonymized MICCAI 2026 review PDF.
  After de-anonymization, replace the review note with the final author list and add paper/code/data links.
</div>

<div class="row align-items-center">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI30.png" title="HeartVolMesh overview" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-5 mt-3 mt-md-0">
    <div class="hvm-card">
      <h3>Why this matters</h3>
      <p>
        In-silico cardiovascular studies need more than a surface boundary.
        They need a patient-specific <strong>volumetric mesh</strong> that can be consumed by FEM/CFD solvers,
        while keeping geometry faithful enough for thin walls and multi-structure junctions.
      </p>
    </div>
    <div class="hvm-card">
      <h3>What is new</h3>
      <p>
        HeartVolMesh lifts each template vertex from a deterministic point to an
        <strong>anisotropic Gaussian kernel</strong>, predicts both displacements and covariances from the image,
        and then warps a tetrahedral template to the reconstructed target surface.
      </p>
    </div>
    <div class="hvm-card">
      <h3>What you get</h3>
      <p>
        A topology-consistent surface plus a correspondence-preserving tetrahedral mesh,
        with resolution controlled by the chosen template rather than by unstable per-case tetrahedralization.
      </p>
    </div>
  </div>
</div>
<div class="caption">
  Overview of the full pipeline. A covariance-guided image-to-surface module predicts a target boundary,
  and a template-driven volume-to-surface registration stage converts it into a patient-specific tetrahedral mesh.
</div>

## Abstract

Accurate patient-specific tetrahedral cardiac meshes are essential for in-silico trials, yet common segmentation-then-modelling pipelines can blur thin-wall anatomy and offer limited cross-case correspondence. HeartVolMesh addresses this with two complementary ideas. First, it reconstructs a topology-consistent surface by predicting per-vertex displacements together with Cholesky-parameterized anisotropic covariances, so uncertainty and local geometric support are modelled directly during learning. Second, it warps a fixed tetrahedral template to the reconstructed surface through staged alignment, non-rigid registration, and deformation-field propagation, preserving connectivity and correspondence by construction. The result is a simulation-oriented image-to-mesh pipeline that improves surface accuracy while unlocking high-quality volumetric reconstruction.

## Contributions

<div class="hvm-grid-3">
  <div class="hvm-step">
    <div class="hvm-step-num">01</div>
    <h4>Covariance-guided graph deformation</h4>
    <p>
      Each template vertex is represented as an anisotropic Gaussian kernel, allowing the network
      to learn direction-aware geometric tolerance rather than relying only on uniform Euclidean supervision.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">02</div>
    <h4>Template-driven volumetric meshing</h4>
    <p>
      A high-quality tetrahedral template is aligned to the predicted surface and deformed through
      a dense deformation field, preserving mesh connectivity and enabling cross-case correspondence.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">03</div>
    <h4>Whole-heart validation</h4>
    <p>
      The framework is evaluated on multi-structure cardiac reconstruction and shows consistent gains
      in both surface-mesh accuracy and volumetric boundary fidelity, together with strong element quality.
    </p>
  </div>
</div>

## Representation and learning objective

<div class="row align-items-center">
  <div class="col-sm-5 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI32.png" title="Representation comparison" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-7 mt-3 mt-md-0">
    <div class="hvm-card hvm-tight">
      <h3>From points to covariance-guided meshes</h3>
      <ul>
        <li>Classical point sets store isolated coordinates.</li>
        <li>Classical meshes add graph connectivity but still treat each vertex as a point.</li>
        <li><strong>HeartVolMesh</strong> extends every vertex to <code>[x, y, z] + 6</code> covariance parameters,
            allowing local anisotropy to be learned directly from the volume.</li>
      </ul>
    </div>
    <div class="hvm-card">
      <h3>Covariance-guided matching loss</h3>
      <p>
        Surface supervision uses a covariance-aware negative log-likelihood objective with lightweight
        edge, Laplacian, and normal regularization:
      </p>
      $$
      \ell(x, y; \Sigma)=\frac{1}{2}(x-y)^\top \Sigma^{-1}(x-y)+\beta\log\det(\Sigma).
      $$
      <p style="margin-top:0.8rem;">
        This lets the model express spatially varying and direction-dependent uncertainty,
        which is especially useful near thin walls and multi-structure junctions.
      </p>
    </div>
  </div>
</div>
<div class="caption">
  HeartVolMesh augments the usual mesh representation with covariance information,
  enabling anisotropic and topology-consistent surface reconstruction.
</div>

## Pipeline at a glance

<div class="hvm-grid-3">
  <div class="hvm-step">
    <div class="hvm-step-num">A</div>
    <h4>Image-conditioned vertex features</h4>
    <p>
      A 3D CNN encoder extracts multi-scale volumetric features, which are sampled at current vertex positions
      and propagated over the mesh graph with a GNN.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">B</div>
    <h4>Coarse-to-fine surface prediction</h4>
    <p>
      Meshes are progressively refined across stages. The final head predicts both vertex displacements
      and Cholesky parameters for covariance construction.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">C</div>
    <h4>Surface-to-volume propagation</h4>
    <p>
      Surface motion is converted into a dense deformation field and applied to every vertex of a tetrahedral template,
      yielding a volumetric mesh whose boundary matches the reconstructed patient-specific surface.
    </p>
  </div>
</div>

## Interactive visual comparisons

<div class="hvm-note">
  This section reproduces the <strong>draggable comparison</strong> feel you liked from the Neuralangelo page.
  To activate the three sliders below, export the matched-view PNG pairs listed in the asset checklist and place them in
  <code>assets/img/paper/lin2026heartvolmesh/</code>.
</div>

<!-- Expected slider assets:
  slider_case1_heartdeformnet.png
  slider_case1_heartvolmesh.png
  slider_case2_ours3p1.png
  slider_case2_ours3p6.png
  slider_case3_pseudogt.png
  slider_case3_heartvolmesh.png
-->

<div class="hvm-compare-grid">
  <div class="hvm-compare-card">
    <div class="hvm-compare-title">Case 1 · HeartDeformNet vs HeartVolMesh</div>
    <div class="hvm-compare" style="--position: 62%;">
      <img
        class="hvm-compare-base"
        src="{{ '/assets/img/paper/lin2026heartvolmesh/slider_case1_heartdeformnet.png' | relative_url }}"
        alt="HeartDeformNet result for interactive comparison case 1">
      <div class="hvm-compare-overlay">
        <img
          src="{{ '/assets/img/paper/lin2026heartvolmesh/slider_case1_heartvolmesh.png' | relative_url }}"
          alt="HeartVolMesh result for interactive comparison case 1">
      </div>
      <div class="hvm-compare-divider"></div>
      <span class="hvm-compare-label hvm-left">Baseline</span>
      <span class="hvm-compare-label hvm-right">HeartVolMesh</span>
      <label class="hvm-sr-only" for="hvm-slider-1">Comparison slider for case 1</label>
      <input id="hvm-slider-1" class="hvm-compare-range" type="range" min="0" max="100" value="62" aria-label="Comparison slider for case 1">
    </div>
    <p class="hvm-compare-caption">
      Suggested content: a difficult multi-structure junction where the baseline shows blur, leakage, or overlap,
      while HeartVolMesh gives a cleaner boundary.
    </p>
  </div>

  <div class="hvm-compare-card">
    <div class="hvm-compare-title">Case 2 · Ours 3p1 vs Ours 3p6</div>
    <div class="hvm-compare" style="--position: 58%;">
      <img
        class="hvm-compare-base"
        src="{{ '/assets/img/paper/lin2026heartvolmesh/slider_case2_ours3p1.png' | relative_url }}"
        alt="Ours 3p1 result for interactive comparison case 2">
      <div class="hvm-compare-overlay">
        <img
          src="{{ '/assets/img/paper/lin2026heartvolmesh/slider_case2_ours3p6.png' | relative_url }}"
          alt="Ours 3p6 result for interactive comparison case 2">
      </div>
      <div class="hvm-compare-divider"></div>
      <span class="hvm-compare-label hvm-left">Ours 3p1</span>
      <span class="hvm-compare-label hvm-right">Ours 3p6</span>
      <label class="hvm-sr-only" for="hvm-slider-2">Comparison slider for case 2</label>
      <input id="hvm-slider-2" class="hvm-compare-range" type="range" min="0" max="100" value="58" aria-label="Comparison slider for case 2">
    </div>
    <p class="hvm-compare-caption">
      Suggested content: a view that highlights the gain from anisotropic covariance modelling,
      especially around sharp curvature or thin-wall anatomy.
    </p>
  </div>

  <div class="hvm-compare-card">
    <div class="hvm-compare-title">Case 3 · Pseudo-GT vs HeartVolMesh</div>
    <div class="hvm-compare" style="--position: 50%;">
      <img
        class="hvm-compare-base"
        src="{{ '/assets/img/paper/lin2026heartvolmesh/slider_case3_pseudogt.png' | relative_url }}"
        alt="Pseudo ground truth result for interactive comparison case 3">
      <div class="hvm-compare-overlay">
        <img
          src="{{ '/assets/img/paper/lin2026heartvolmesh/slider_case3_heartvolmesh.png' | relative_url }}"
          alt="HeartVolMesh result for interactive comparison case 3">
      </div>
      <div class="hvm-compare-divider"></div>
      <span class="hvm-compare-label hvm-left">Pseudo-GT</span>
      <span class="hvm-compare-label hvm-right">Prediction</span>
      <label class="hvm-sr-only" for="hvm-slider-3">Comparison slider for case 3</label>
      <input id="hvm-slider-3" class="hvm-compare-range" type="range" min="0" max="100" value="50" aria-label="Comparison slider for case 3">
    </div>
    <p class="hvm-compare-caption">
      Suggested content: a matched-view visual sanity check showing that the predicted volumetric boundary
      remains close to the target anatomy while preserving template structure.
    </p>
  </div>
</div>

## Experimental setting

<div class="hvm-grid-2">
  <div class="hvm-card">
    <h3>Dataset and training</h3>
    <ul>
      <li>Multi-centre in-house dataset with <strong>900 patients</strong> and <strong>4,000 temporal instances</strong>.</li>
      <li>Patient-level split: <strong>800 patients / 3,600 instances</strong> for training and <strong>100 patients / 400 instances</strong> for validation.</li>
      <li>Single NVIDIA A100 80GB, Adam optimizer, 100 epochs, batch size 1.</li>
      <li>Input crops of <code>128^3</code>; deformation field predicted at <code>300^3</code>.</li>
    </ul>
  </div>
  <div class="hvm-card">
    <h3>Evaluation protocol</h3>
    <ul>
      <li>Surface reconstruction on <strong>LA, LV, RA, RV, and LVMyo</strong>.</li>
      <li>Volumetric reconstruction on <strong>LAMyo, LVMyo, RAMyo, and RVMyo</strong>.</li>
      <li>Boundary metrics: symmetric Chamfer Distance, HD95, and Normal Consistency.</li>
      <li>Volumetric quality: inverted elements, minimum scaled Jacobian, and minimum dihedral angle.</li>
    </ul>
  </div>
</div>

## Qualitative volumetric reconstruction

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI50.png" title="Qualitative volumetric reconstruction" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Qualitative comparison of boundary surfaces extracted from the final tetrahedral meshes.
  In the paper, HeartVolMesh (Ours 3p6) produces sharper boundaries and fewer outliers,
  especially near inter-structure junctions.
</div>

## Quantitative summary

<div class="row align-items-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI44.png" title="Quantitative summary" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    <div class="hvm-stat">
      <div class="hvm-stat-value">0.0%</div>
      <div class="hvm-stat-label">Inverted elements</div>
      <div class="hvm-stat-detail">Across 400 test instances when using the proposed warping pipeline.</div>
    </div>
    <div class="hvm-stat" style="margin-top:0.9rem;">
      <div class="hvm-stat-value">0.0416 ± 0.0152</div>
      <div class="hvm-stat-label">Minimum scaled Jacobian</div>
      <div class="hvm-stat-detail">Reported for the reconstructed tetrahedral meshes.</div>
    </div>
    <div class="hvm-stat" style="margin-top:0.9rem;">
      <div class="hvm-stat-value">5.56° ± 1.41°</div>
      <div class="hvm-stat-label">Minimum dihedral angle</div>
      <div class="hvm-stat-detail">Strong element quality for simulation-oriented volumetric meshing.</div>
    </div>
  </div>
</div>
<div class="caption">
  Top: normalized radar plots over 24 volumetric parts. Bottom: boxplots over five surface structures.
  HeartVolMesh (Ours 3p6) shows lower errors and reduced variance.
</div>

<div class="hvm-grid-2">
  <div class="hvm-card">
    <h3>Best surface-mesh CD / HD95 / NC (Ours 3p6)</h3>
    <table class="hvm-mini-table">
      <thead>
        <tr>
          <th>Structure</th>
          <th>CD ↓</th>
          <th>HD95 ↓</th>
          <th>NC ↑</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>LA</td><td>2.5</td><td>2.2</td><td>89.5%</td></tr>
        <tr><td>LV</td><td>3.0</td><td>2.8</td><td>88.7%</td></tr>
        <tr><td>Myo</td><td>4.0</td><td>3.6</td><td>87.6%</td></tr>
        <tr><td>RA</td><td>2.9</td><td>2.8</td><td>88.3%</td></tr>
        <tr><td>RV</td><td>3.3</td><td>3.1</td><td>87.3%</td></tr>
      </tbody>
    </table>
  </div>

  <div class="hvm-card">
    <h3>Best volumetric-boundary CD / HD95 / NC (Ours 3p6)</h3>
    <table class="hvm-mini-table">
      <thead>
        <tr>
          <th>Structure</th>
          <th>CD ↓</th>
          <th>HD95 ↓</th>
          <th>NC ↑</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>LVMyo</td><td>3.6</td><td>3.2</td><td>95.3%</td></tr>
        <tr><td>RVMyo</td><td>3.1</td><td>2.8</td><td>94.2%</td></tr>
        <tr><td>LAMyo</td><td>3.0</td><td>3.0</td><td>87.7%</td></tr>
        <tr><td>RAMyo</td><td>3.0</td><td>2.9</td><td>92.2%</td></tr>
      </tbody>
    </table>
  </div>
</div>

## Key takeaways

<div class="hvm-grid-3">
  <div class="hvm-step">
    <div class="hvm-step-num">I</div>
    <h4>Better boundary localization</h4>
    <p>
      Covariance-guided supervision improves robustness where uniform Euclidean penalties are too rigid,
      especially at ambiguous and thin anatomical boundaries.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">II</div>
    <h4>Volumetric meshes with correspondence</h4>
    <p>
      By deforming a fixed tetrahedral template instead of tetrahedralizing each case independently,
      the framework preserves connectivity and enables cross-case vertex correspondence by design.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">III</div>
    <h4>Simulation-oriented flexibility</h4>
    <p>
      The method trades fully end-to-end meshing for a template-conditioned formulation that can support
      different mesh densities and element specifications when an appropriate template is provided.
    </p>
  </div>
</div>

## Optional teaser assets

<div class="hvm-optional">
  The page already works with the paper figures and slider PNG pairs above.
  If you want an even richer landing experience, the prompt appendix includes an optional teaser still and short teaser video.
  You can later uncomment a video block or replace the hero image with those assets.
</div>

<!-- Optional teaser video block. Uncomment after generating the files below.
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    <video
      class="img-fluid rounded z-depth-1"
      controls
      muted
      loop
      playsinline
      poster="{{ '/assets/img/paper/lin2026heartvolmesh/heartvolmesh_teaser_still.png' | relative_url }}">
      <source src="{{ '/assets/video/lin2026heartvolmesh/heartvolmesh_teaser.mp4' | relative_url }}" type="video/mp4">
    </video>
  </div>
</div>
<div class="caption">
  Optional teaser video for the project page hero section.
</div>
-->

## Citation

```bibtex
@inproceedings{heartvolmesh2026,
  title     = {HeartVolMesh: Cardiac Volumetric Mesh Reconstruction via Covariance-Guided Graph Deformation},
  author    = {Anonymous},
  booktitle = {Medical Image Computing and Computer Assisted Intervention (MICCAI)},
  year      = {2026},
  note      = {Review version; replace with final metadata after de-anonymization}
}