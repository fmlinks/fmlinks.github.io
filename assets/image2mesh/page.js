(() => {
  'use strict';

  // Every panel remains readable when JavaScript is unavailable.
  function setupTabs(list, panels) {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab, focus = false) => {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        const panel = panels.find(candidate => candidate.id === item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else next = (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
        select(tabs[next], true);
      });
    });
    select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
    return select;
  }

  const selectFamily = setupTabs(document.querySelector('.method-tabs'), [...document.querySelectorAll('.method-panel')]);
  setupTabs(document.querySelector('.evidence-tabs'), [...document.querySelectorAll('.evidence-panel')]);
  document.querySelectorAll('[data-family-link]').forEach(link => {
    link.addEventListener('click', () => {
      const tab = document.querySelector(`[data-family="${link.dataset.familyLink}"]`);
      if (tab) selectFamily(tab);
    });
  });

  document.querySelectorAll('.subcategories').forEach(group => {
    const panel = group.closest('.method-panel');
    const image = panel.querySelector('.method-figure img');
    const link = panel.querySelector('.method-figure a');
    const base = new URL('.', image.src);
    group.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        group.querySelectorAll('button').forEach(item => {
          item.classList.toggle('selected', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        image.src = new URL(button.dataset.figure, base).href;
        image.alt = button.dataset.alt;
        link.href = image.src;
        link.dataset.caption = `${panel.querySelector('h3').textContent} — ${button.textContent.trim()}`;
      });
    });
  });

  const dialog = document.querySelector('#figure-dialog');
  if (typeof dialog.showModal === 'function') {
    const dialogImage = dialog.querySelector('img');
    const caption = dialog.querySelector('#dialog-caption');
    const original = dialog.querySelector('#dialog-original');
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        dialogImage.src = link.href;
        dialogImage.alt = link.querySelector('img').alt;
        caption.textContent = link.dataset.caption;
        original.href = link.href;
        dialog.showModal();
      });
    });
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }

  const copy = document.querySelector('#copy-citation');
  const status = document.querySelector('.copy-status');
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    const code = document.querySelector('#bibtex');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'BibTeX copied to clipboard.';
      copy.textContent = 'Copied';
      setTimeout(() => { copy.textContent = 'Copy BibTeX'; }, 2200);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
      code.closest('pre').focus();
    }
  });

  const video = document.querySelector('#survey-video');
  const videoError = document.querySelector('.video-error');
  video.addEventListener('error', () => { videoError.hidden = false; });
  video.querySelector('source').addEventListener('error', () => { videoError.hidden = false; });

  const progress = document.querySelector('.reading-progress');
  let pending = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0})`;
    pending = false;
  };
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', updateProgress));
  updateProgress();

  if ('IntersectionObserver' in window) {
    const navigation = [...document.querySelectorAll('.nav-links a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-12% 0px -55% 0px' });
    document.querySelectorAll('#overview, #methods, #evidence, #video').forEach(section => observer.observe(section));
  }
})();
