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


.hvm-support {
  position: relative;
  overflow: hidden;
  margin: 1rem 0 0 0;
  padding: 1.45rem 1.35rem 1.2rem 1.35rem;
  border: 1px solid rgba(118, 185, 0, 0.28);
  border-radius: 24px;
  background:
    radial-gradient(circle at 100% 0%, rgba(118, 185, 0, 0.20), transparent 32%),
    radial-gradient(circle at 0% 100%, rgba(163, 230, 53, 0.12), transparent 30%),
    linear-gradient(135deg, rgba(10, 16, 10, 0.98), rgba(22, 28, 22, 0.96));
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.18);
  color: #f8fafc;
}

.hvm-support::after {
  content: "";
  position: absolute;
  right: -54px;
  bottom: -54px;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  background: rgba(118, 185, 0, 0.12);
  filter: blur(30px);
  pointer-events: none;
}

.hvm-support-grid {
  display: grid;
  grid-template-columns: minmax(0, 290px) 1fr;
  gap: 1.3rem;
  align-items: center;
}

.hvm-support-logo {
  padding: 1rem 1.05rem;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.20);
}

.hvm-support-logo img {
  display: block;
  width: 100%;
  height: auto;
}

.hvm-support-kicker {
  margin-bottom: 0.45rem;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #b4f061;
}

.hvm-support h3 {
  margin-top: 0;
  margin-bottom: 0.55rem;
  color: #fff;
  font-size: 1.65rem;
}

.hvm-support p {
  color: rgba(248, 250, 252, 0.90);
}

.hvm-support p:last-of-type {
  margin-bottom: 0;
}

.hvm-support a {
  color: #d8ff90;
  text-decoration: underline;
  text-underline-offset: 0.16em;
}

.hvm-support-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.95rem;
}

.hvm-support-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.78rem;
  border-radius: 999px;
  border: 1px solid rgba(180, 240, 97, 0.22);
  background: rgba(118, 185, 0, 0.14);
  color: #f3ffe0;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1;
}

.hvm-support-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.8rem;
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.10);
  color: rgba(248, 250, 252, 0.84);
  font-size: 0.95rem;
}

.hvm-support-foot-label {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.62rem;
  border-radius: 999px;
  background: #76b900;
  color: #091009;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;
}



.hvm-video-showcase {
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: 1.15rem;
  align-items: center;
  margin: 0 0 1.75rem 0;
  padding: 1.35rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 24px;
  background:
    radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.12), transparent 30%),
    radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.08), transparent 28%),
    var(--global-card-bg-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
}

.hvm-video-copy {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.hvm-video-kicker {
  margin-bottom: 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--global-theme-color);
}

.hvm-video-copy h2 {
  margin: 0;
  font-size: 1.65rem;
  line-height: 1.2;
}

.hvm-video-copy p {
  margin: 0;
  color: var(--global-text-color-light);
}

.hvm-video-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.15rem;
}

.hvm-video-tab {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--global-divider-color);
  border-radius: 999px;
  padding: 0.58rem 0.92rem;
  background: rgba(127, 127, 127, 0.08);
  color: var(--global-text-color);
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;
}

.hvm-video-tab:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.hvm-video-tab.is-active {
  border-color: var(--global-theme-color);
  background: rgba(99, 102, 241, 0.12);
  color: var(--global-theme-color);
}

.hvm-video-frame {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hvm-video-player {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 18px;
  border: 1px solid var(--global-divider-color);
  background: #000;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08);
}

.hvm-video-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 0.85rem;
}

.hvm-video-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.34rem 0.72rem;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.12);
  color: var(--global-theme-color);
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1;
}

.hvm-video-hint {
  font-size: 0.92rem;
  color: var(--global-text-color-light);
}

@media (max-width: 1080px) {
  .hvm-grid-3,
  .hvm-metrics,
  .hvm-compare-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .hvm-grid-2,
  .hvm-support-grid,
  .hvm-video-showcase {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="hvm-video-showcase">
  <div class="hvm-video-copy">
    <div class="hvm-video-kicker">Project video</div>
    <h2>Watch the HeartVolMesh introduction</h2>
    <p>
      The player starts with the English version by default. Use the buttons below to
      switch between English and Chinese while keeping the native playback controls for
      seeking, pausing, volume, and fullscreen.
    </p>
    <div class="hvm-video-switch" role="group" aria-label="Select introduction video language">
      <button
        type="button"
        class="hvm-video-tab is-active"
        aria-controls="hvmIntroVideo"
        aria-pressed="true"
        data-video-lang="en"
        data-video-label="English introduction"
        data-video-src="{{ '/assets/video/lin2026heartvolmesh/HeartVolMeshEN.mp4' | relative_url }}">
        English
      </button>
      <button
        type="button"
        class="hvm-video-tab"
        aria-controls="hvmIntroVideo"
        aria-pressed="false"
        data-video-lang="cn"
        data-video-label="中文介绍"
        data-video-src="{{ '/assets/video/lin2026heartvolmesh/HeartVolMeshCN.mp4' | relative_url }}">
        中文
      </button>
    </div>
  </div>

  <div class="hvm-video-frame">
    <video
      id="hvmIntroVideo"
      class="img-fluid rounded z-depth-1 hvm-video-player"
      controls
      autoplay
      muted
      playsinline
      preload="metadata"
      poster="{{ '/assets/img/paper/lin2026heartvolmesh/GGS_MICCAI30.png' | relative_url }}">
      <source
        id="hvmIntroVideoSource"
        src="{{ '/assets/video/lin2026heartvolmesh/HeartVolMeshEN.mp4' | relative_url }}"
        type="video/mp4">
      Your browser does not support embedded videos.
    </video>
    <div class="hvm-video-meta">
      <span id="hvmIntroVideoStatus" class="hvm-video-badge" aria-live="polite">Now playing: English introduction</span>
      <span class="hvm-video-hint">Autoplay starts muted. Drag the timeline in the native controls to seek through the video.</span>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('hvmIntroVideo');
  const source = document.getElementById('hvmIntroVideoSource');
  const status = document.getElementById('hvmIntroVideoStatus');
  const buttons = Array.from(document.querySelectorAll('.hvm-video-tab'));
  let pendingRestore = null;

  if (!video || !source || buttons.length === 0) {
    return;
  }

  function updateButtons(activeButton) {
    buttons.forEach(function (button) {
      const isActive = button === activeButton;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function updateStatus(label) {
    if (status) {
      status.textContent = 'Now playing: ' + label;
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const nextSrc = button.getAttribute('data-video-src');
      const nextLabel = button.getAttribute('data-video-label') || button.textContent.trim();

      if (!nextSrc) {
        return;
      }

      updateButtons(button);

      if (source.getAttribute('src') === nextSrc) {
        updateStatus(nextLabel);
        return;
      }

      const currentTime = video.currentTime || 0;
      const wasPaused = video.paused;
      const currentMuted = video.muted;
      const currentVolume = video.volume;
      const currentRate = video.playbackRate;

      if (pendingRestore) {
        video.removeEventListener('loadedmetadata', pendingRestore);
        pendingRestore = null;
      }

      function restoreState() {
        let safeTime = currentTime;

        if (Number.isFinite(video.duration) && video.duration > 0) {
          safeTime = Math.min(currentTime, Math.max(video.duration - 0.05, 0));
        }

        if (safeTime > 0) {
          try {
            video.currentTime = safeTime;
          } catch (error) {}
        }

        video.muted = currentMuted;
        video.volume = currentVolume;
        video.playbackRate = currentRate;
        updateStatus(nextLabel);

        if (!wasPaused) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function () {});
          }
        }

        video.removeEventListener('loadedmetadata', restoreState);
        pendingRestore = null;
      }

      pendingRestore = restoreState;
      video.addEventListener('loadedmetadata', restoreState);
      source.setAttribute('src', nextSrc);
      video.load();
    });
  });

  const defaultButton = buttons.find(function (button) {
    return button.getAttribute('data-video-lang') === 'en';
  }) || buttons[0];

  updateButtons(defaultButton);
  updateStatus(defaultButton.getAttribute('data-video-label') || defaultButton.textContent.trim());

  const autoplayPromise = video.play();
  if (autoplayPromise && typeof autoplayPromise.catch === 'function') {
    autoplayPromise.catch(function () {});
  }
});
</script>

<div class="hvm-hero">
  <div class="hvm-kicker">Preprint · Review Version</div>
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
  <strong>Note.</strong> This page is written against the anonymized review PDF.
  After de-anonymization, we will replace the review note with the final author list and add paper/code/data links.
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

## Citation

```bibtex
@inproceedings{heartvolmesh2026,
  title     = {HeartVolMesh: Cardiac Volumetric Mesh Reconstruction via Covariance-Guided Graph Deformation},
  author    = {Anonymous},
  booktitle = {ArXiv preprint},
  year      = {2026},
  note      = {Review version; replace with final metadata after de-anonymization}
}

```

## NVIDIA Academic Grant Support

<div class="hvm-support">
  <div class="hvm-support-grid">
    <div class="hvm-support-logo">
      <img
        loading="lazy"
        src="data:image/png;base64,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"
        alt="NVIDIA logo">
    </div>
    <div>
      <div class="hvm-support-kicker">Research support</div>
      <h3>This project was made possible by the NVIDIA Academic Grant Program</h3>
      <p>
        HeartVolMesh was made possible by the same NVIDIA Academic Grant support that
        underpinned our broader research effort, even though the final direction of this project evolved
        beyond the scope of the original proposal.
      </p>
      <p>
        This support helped accelerate the compute-intensive experimentation behind the project—from
        3D image-conditioned surface reconstruction to template-driven volumetric warping and validation.
        Learn more about the
        <a href="https://www.nvidia.com/en-us/industries/higher-education-research/academic-grant-program/" target="_blank" rel="noopener">NVIDIA Academic Grant Program</a>.
      </p>
      <div class="hvm-support-pill-row">
        <span class="hvm-support-pill">NVIDIA Academic Grant Program</span>
        <span class="hvm-support-pill">GPU-accelerated research</span>
        <span class="hvm-support-pill">Simulation-ready cardiac meshing</span>
      </div>
    </div>
  </div>
  <div class="hvm-support-foot">
    <span class="hvm-support-foot-label">Grant acknowledgement</span>
    <p class="hvm-support-foot-text">
      NVIDIA-supported academic compute helped accelerate development, experimentation, and validation for this work.
    </p>
  </div>
</div>

