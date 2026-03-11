---
layout: page
title: "HeartVolMesh"
description: "Cardiac Volumetric Mesh Reconstruction via Covariance-Guided Graph Deformation"
img: assets/img/paper/lin2026heartvolmesh/GGS_MICCAI30.png
importance: 1
category: ongoing
related_publications: false
---

<style>
.hvm-hero {
  margin: 0 0 1.4rem 0;
  padding: 1.4rem 1.35rem 1.2rem 1.35rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.12), transparent 32%),
    radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.08), transparent 28%),
    var(--global-card-bg-color);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
}

.hvm-kicker {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--global-theme-color);
}

.hvm-tagline {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.7;
}

.hvm-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.95rem;
}

.hvm-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.76rem;
  border-radius: 999px;
  border: 1px solid var(--global-divider-color);
  background: rgba(127, 127, 127, 0.08);
  font-size: 0.88rem;
  line-height: 1;
}

.hvm-note {
  margin: 0.95rem 0 1.35rem 0;
  padding: 0.92rem 1rem;
  border-left: 4px solid var(--global-theme-color);
  border-radius: 0 14px 14px 0;
  background: rgba(127, 127, 127, 0.07);
}

.hvm-kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin: 1rem 0 1.4rem 0;
}

.hvm-kpi {
  padding: 0.95rem 1rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  background: var(--global-card-bg-color);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
}

.hvm-kpi-value {
  font-size: 1.65rem;
  font-weight: 800;
  line-height: 1;
  color: var(--global-theme-color);
}

.hvm-kpi-label {
  margin-top: 0.45rem;
  font-weight: 700;
}

.hvm-kpi-detail {
  margin-top: 0.25rem;
  font-size: 0.92rem;
  color: var(--global-text-color-light);
}

.hvm-card {
  padding: 1rem 1.05rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 18px;
  background: var(--global-card-bg-color);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
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
  margin: 1rem 0 1.45rem 0;
}

.hvm-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.45rem 0;
}

.hvm-step {
  padding: 1.1rem 1rem 0.95rem 1rem;
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
  width: 2.05rem;
  height: 2.05rem;
  margin-bottom: 0.72rem;
  border-radius: 999px;
  background: var(--global-theme-color);
  color: #fff;
  font-weight: 800;
  font-size: 0.9rem;
  line-height: 1;
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
  padding: 0.68rem 0.78rem;
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

.hvm-placeholder {
  padding: 1rem 1.05rem;
  border: 1px dashed var(--global-divider-color);
  border-radius: 18px;
  background: rgba(127, 127, 127, 0.05);
}

.hvm-placeholder-title {
  margin: 0 0 0.35rem 0;
  font-weight: 700;
}

.hvm-code-note {
  margin-top: 0.85rem;
  font-size: 0.92rem;
  color: var(--global-text-color-light);
}

.hvm-bib {
  margin: 0.75rem 0 0 0;
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid var(--global-divider-color);
  background: rgba(127, 127, 127, 0.05);
  overflow-x: auto;
}

.hvm-bib code {
  white-space: pre;
}

@media (max-width: 1080px) {
  .hvm-kpi-grid,
  .hvm-grid-3 {
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
  <div class="hvm-kicker">Preprint · Review Version</div>
  <p class="hvm-tagline">
    From 3D CTA volumes to simulation-ready tetrahedral heart meshes,
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
  <strong>Note.</strong> This page is written against the anonymized MICCAI 2026 review version.
  After de-anonymization, replace the review note with the final author list and add paper/code/data links.
</div>


<div class="row align-items-center">
  <div class="col-sm-7 mt-3 mt-md-0">
    <video class="img-fluid rounded z-depth-1" autoplay muted loop playsinline preload="metadata">
      <source src="{{ '/assets/video/lin2026heartvolmesh/GGS_MICCAI30.mp4' | relative_url }}" type="video/mp4">
    </video>
  </div>
  <div class="col-sm-5 mt-3 mt-md-0">
    <div class="hvm-card">
      <h3>Why this matters</h3>
      <p>
        In-silico cardiovascular studies need more than a surface boundary.
        They need a patient-specific <strong>volumetric mesh</strong> that can be used by FEM/CFD solvers,
        while remaining faithful around thin walls and multi-structure junctions.
      </p>
    </div>
    <div class="hvm-card">
      <h3>Core idea</h3>
      <p>
        HeartVolMesh lifts each template vertex from a deterministic point to an
        <strong>anisotropic Gaussian kernel</strong>, predicts both displacement and covariance,
        and then warps a tetrahedral template to the reconstructed target surface.
      </p>
    </div>
    <div class="hvm-card">
      <h3>What this gives</h3>
      <p>
        A topology-consistent surface plus a correspondence-preserving tetrahedral mesh,
        with resolution controlled by the chosen template instead of per-case tetrahedralization.
      </p>
    </div>
  </div>
</div>
<div class="caption">
  Overview of the full pipeline. A covariance-guided image-to-surface module predicts the target boundary,
  and a template-driven volume-to-surface registration stage converts it into a patient-specific tetrahedral mesh.
</div>

<div class="hvm-kpi-grid">
  <div class="hvm-kpi">
    <div class="hvm-kpi-value">0.0%</div>
    <div class="hvm-kpi-label">Inverted elements</div>
    <div class="hvm-kpi-detail">Across 400 reconstructed tetrahedral meshes in the reported evaluation.</div>
  </div>
  <div class="hvm-kpi">
    <div class="hvm-kpi-value">0.0416 ± 0.0152</div>
    <div class="hvm-kpi-label">Minimum scaled Jacobian</div>
    <div class="hvm-kpi-detail">Stable volumetric element quality for simulation-oriented meshing.</div>
  </div>
  <div class="hvm-kpi">
    <div class="hvm-kpi-value">5.56° ± 1.41°</div>
    <div class="hvm-kpi-label">Minimum dihedral angle</div>
    <div class="hvm-kpi-detail">Strong geometric quality under template-driven deformation.</div>
  </div>
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
      a dense deformation field, preserving connectivity and enabling cross-case correspondence.
    </p>
  </div>
  <div class="hvm-step">
    <div class="hvm-step-num">03</div>
    <h4>Whole-heart validation</h4>
    <p>
      The framework is evaluated on multi-structure cardiac reconstruction and shows consistent gains
      in surface accuracy, volumetric boundary fidelity, and element quality.
    </p>
  </div>
</div>

## Representation and learning objective

<div class="row align-items-center">
  <div class="col-sm-5 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI32.png" title="Representation comparison" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-7 mt-3 mt-md-0">
    <div class="hvm-card">
      <h3>From points to covariance-guided meshes</h3>
      <ul>
        <li>Classical point sets store isolated coordinates.</li>
        <li>Classical meshes add graph connectivity but still treat each vertex as a point.</li>
        <li><strong>HeartVolMesh</strong> extends every vertex to <code>[x, y, z] + 6</code> covariance parameters,
            allowing local anisotropy to be learned directly from the image volume.</li>
      </ul>
    </div>
    <div class="hvm-card">
      <h3>Covariance-guided matching loss</h3>
      <p>
        Surface supervision uses a covariance-aware negative log-likelihood objective with edge,
        Laplacian, and normal regularization:
      </p>
      $$
      \ell(x, y; \Sigma)=\frac{1}{2}(x-y)^\top \Sigma^{-1}(x-y)+\beta\log\det(\Sigma).
      $$
      <p style="margin-top:0.8rem;">
        This allows the model to express spatially varying and direction-dependent uncertainty,
        which is especially helpful near thin-wall and high-curvature anatomy.
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

## Results

<div class="row align-items-center">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI50.png" title="Qualitative volumetric reconstruction" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-5 mt-3 mt-md-0">
    <div class="hvm-card">
      <h3>Qualitative trend</h3>
      <p>
        HeartVolMesh produces sharper boundaries and fewer outliers in the reconstructed volumetric boundary,
        especially around inter-structure junctions where simple deformation baselines are more fragile.
      </p>
    </div>
    <div class="hvm-card">
      <h3>Why this is useful</h3>
      <p>
        The final volumetric mesh is not just visually cleaner. It is also easier to use in downstream simulation,
        because connectivity is inherited from a valid template and correspondence is preserved across cases.
      </p>
    </div>
  </div>
</div>
<div class="caption">
  Qualitative comparison of boundary surfaces extracted from the final tetrahedral meshes.
</div>

<div class="row align-items-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="lazy" path="assets/img/paper/lin2026heartvolmesh/GGS_MICCAI44.png" title="Quantitative summary" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    <div class="hvm-card">
      <h3>Quantitative summary</h3>
      <p>
        The paper reports lower error and reduced variance for the final method across both
        surface reconstruction and volumetric-boundary evaluation.
      </p>
      <p>
        Top: normalized radar plots over 24 volumetric parts.<br>
        Bottom: boxplots over five surface structures.
      </p>
    </div>
  </div>
</div>
<div class="caption">
  Quantitative overview of performance across surface structures and volumetric parts.
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
      The method uses a template-conditioned formulation that can support different mesh densities and
      element specifications when an appropriate tetrahedral template is provided.
    </p>
  </div>
</div>

## Interactive module (optional, recommended later)

<div class="hvm-placeholder">
  <p class="hvm-placeholder-title">Current recommendation</p>
  <p>
    Keep this page clean and figure-driven for now. After the static page is stable, add one of the two optional interactive modules below:
  </p>
  <ul>
    <li><strong>Option A:</strong> matched-view image slider for 2–3 representative cases;</li>
    <li><strong>Option B:</strong> a standalone vtk.js viewer page embedded here with an <code>iframe</code>.</li>
  </ul>
  <p class="hvm-code-note">
    For vtk.js, I recommend uploading surface meshes as <code>.vtp</code> or legacy polydata <code>.vtk</code> first, rather than volumetric unstructured-grid files.
  </p>
</div>

<!-- Optional iframe embed after the viewer is ready.
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    <iframe
      src="{{ '/assets/viewers/lin2026heartvolmesh/index.html' | relative_url }}"
      title="HeartVolMesh interactive viewer"
      style="width:100%; height:720px; border:1px solid var(--global-divider-color); border-radius:18px; background:#000;"
      loading="lazy"></iframe>
  </div>
</div>
<div class="caption">
  Interactive viewer for 24 parts or selected comparison cases.
</div>
-->

## Citation

<div class="hvm-bib"><code>@inproceedings{heartvolmesh2026,
  title     = {HeartVolMesh: Cardiac Volumetric Mesh Reconstruction via Covariance-Guided Graph Deformation},
  author    = {Anonymous},
  booktitle = {preprint},
  year      = {2026},
  note      = {Review version; replace with final metadata after de-anonymization}
}</code></div>