/* readings-ui.js — the reading-lens controls (UI-SPEC.md).
   One graph, read many ways. Three quiet controls: Reading (the door),
   Standing lens (visible validity, made operable), Depth. Vanilla JS, no
   framework, reads build-time /readings.json + /essay-titles.json. Strictly
   progressive enhancement: without JS the site renders exactly as before.
   Attaches into Gwern's settings/mode widget when one is present at runtime;
   otherwise a quiet standalone panel (monochrome + single indigo accent).
   Lives at public/ root (not public/static, which sync-vendor wipes each build). */
(function () {
  'use strict';
  var LS = { reading: 'tmc-reading', lens: 'tmc-lens', depth: 'tmc-depth' };
  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var state = { data: null, titles: {} };

  function boot() {
    Promise.all([
      fetch('/readings.json').then(function (r) { return r.json(); }).catch(function () { return null; }),
      fetch('/essay-titles.json').then(function (r) { return r.json(); }).catch(function () { return {}; })
    ]).then(function (res) {
      state.data = res[0]; state.titles = res[1] || {};
      if (!state.data) return;
      injectControls();
      applyLens(get(LS.lens, 'off'));
      applyDepth(get(LS.depth, 'full'));
      applyReading(get(LS.reading, ''));
      trackLastRead();
      renderContinue();
    });
  }

  function readings() { return (state.data && state.data.readings) || []; }
  function readingBySlug(slug) { return readings().filter(function (r) { return r.slug === slug; })[0]; }

  function injectControls() {
    if (document.querySelector('#reading-lens')) return;
    var panel = document.createElement('div');
    panel.id = 'reading-lens';
    panel.className = 'reading-lens';
    panel.innerHTML = controlsHTML();
    var gw = document.querySelector('#mode-selector, .mode-selector, #reader-mode-selector, .reader-mode-selector, [class*="mode-selector"]');
    if (gw && gw.parentNode) {
      gw.parentNode.insertBefore(panel, gw.nextSibling);
      panel.classList.add('reading-lens-inline');
    } else {
      document.body.appendChild(panel);
      panel.classList.add('reading-lens-floating');
    }
    wire(panel);
  }

  function controlsHTML() {
    var opts = '<option value="">none</option>' + readings().map(function (r) {
      return '<option value="' + r.slug + '">Reading ' + r.num + ' — ' + esc(r.title) + '</option>';
    }).join('');
    return '' +
      '<button type="button" class="rl-toggle" aria-expanded="false" aria-controls="rl-body" title="Reading lens">◆ lens</button>' +
      '<div class="rl-body" id="rl-body" hidden>' +
        '<label class="rl-row"><span>Reading</span> <select class="rl-reading">' + opts + '</select></label>' +
        '<label class="rl-row"><span>Standing</span> <select class="rl-lens">' +
          '<option value="off">off</option><option value="mark">mark</option><option value="documented-only">documented only</option>' +
        '</select></label>' +
        '<label class="rl-row"><span>Depth</span> <select class="rl-depth">' +
          '<option value="full">full</option><option value="abstract">abstract</option>' +
        '</select></label>' +
      '</div>';
  }

  function wire(panel) {
    var toggle = panel.querySelector('.rl-toggle');
    var body = panel.querySelector('.rl-body');
    toggle.addEventListener('click', function () {
      var opening = body.hasAttribute('hidden');
      if (opening) body.removeAttribute('hidden'); else body.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', String(opening));
    });
    var rSel = panel.querySelector('.rl-reading'); rSel.value = get(LS.reading, '');
    rSel.addEventListener('change', function () { set(LS.reading, rSel.value); applyReading(rSel.value); renderContinue(); });
    var lSel = panel.querySelector('.rl-lens'); lSel.value = get(LS.lens, 'off');
    lSel.addEventListener('change', function () { set(LS.lens, lSel.value); applyLens(lSel.value); });
    var dSel = panel.querySelector('.rl-depth'); dSel.value = get(LS.depth, 'full');
    dSel.addEventListener('change', function () { set(LS.depth, dSel.value); applyDepth(dSel.value); });
  }

  /* Control 2 — Standing lens (keys off [data-standing]) */
  function applyLens(v) {
    var root = document.documentElement;
    root.classList.remove('lens-mark', 'lens-doc-only');
    removeNotice();
    if (v === 'mark') root.classList.add('lens-mark');
    else if (v === 'documented-only') { root.classList.add('lens-doc-only'); showNotice(); }
  }
  function showNotice() {
    if (document.querySelector('#lens-notice')) return;
    var n = document.createElement('div');
    n.id = 'lens-notice'; n.className = 'lens-notice';
    n.innerHTML = 'Lens: documented only — <button type="button" class="lens-off">turn off</button>';
    n.querySelector('.lens-off').addEventListener('click', function () {
      set(LS.lens, 'off'); applyLens('off');
      var s = document.querySelector('.rl-lens'); if (s) s.value = 'off';
    });
    document.body.appendChild(n);
  }
  function removeNotice() { var n = document.querySelector('#lens-notice'); if (n) n.remove(); }

  /* Control 3 — Depth (best-effort: collapses pop-frame bodies to their first block) */
  function applyDepth(v) { document.documentElement.classList.toggle('depth-abstract', v === 'abstract'); }

  /* Control 1 — Reading: re-thread essay nav + position marker; mark active section */
  function applyReading(slug) {
    var nav = document.querySelector('nav.essay-nav[data-essay-id]');
    if (nav) {
      var eid = nav.getAttribute('data-essay-id');
      var r = slug ? readingBySlug(slug) : null;
      var i = r ? r.essays.indexOf(eid) : -1;
      if (r && i >= 0) rethreadNav(nav, r, i);
      else clearPosition(nav);
    }
    var sections = document.querySelectorAll('section.reading[data-reading]');
    for (var k = 0; k < sections.length; k++) {
      sections[k].classList.toggle('reading-active', !!slug && sections[k].getAttribute('data-reading') === slug);
    }
  }
  function rethreadNav(nav, r, i) {
    nav.classList.remove('essay-nav-empty');
    setNavLink(nav.querySelector('.essay-nav-prev'), i > 0 ? r.essays[i - 1] : null, 'prev');
    setNavLink(nav.querySelector('.essay-nav-next'), i < r.essays.length - 1 ? r.essays[i + 1] : null, 'next');
    var pos = nav.querySelector('.essay-nav-position');
    if (pos) { pos.textContent = 'Reading ' + r.num + ' · ' + (i + 1) + ' of ' + r.essays.length; pos.removeAttribute('hidden'); }
  }
  function clearPosition(nav) {
    var pos = nav.querySelector('.essay-nav-position');
    if (pos) { pos.setAttribute('hidden', ''); pos.textContent = ''; }
  }
  function setNavLink(span, id, rel) {
    if (!span) return;
    if (!id) { span.innerHTML = ''; return; }
    var t = esc(state.titles[id] || id);
    span.innerHTML = rel === 'prev'
      ? '← <a class="link-page" rel="prev" href="/essays/' + id + '"><span class="essay-nav-label">' + t + '</span></a>'
      : '<a class="link-page" rel="next" href="/essays/' + id + '"><span class="essay-nav-label">' + t + '</span></a> →';
  }

  /* last-read per reading → homepage Continue chip */
  function trackLastRead() {
    var nav = document.querySelector('nav.essay-nav[data-essay-id]');
    if (!nav) return;
    var eid = nav.getAttribute('data-essay-id');
    var slug = get(LS.reading, '');
    if (!slug) return;
    var r = readingBySlug(slug);
    if (r && r.essays.indexOf(eid) >= 0) set('tmc-lastread-' + slug, eid);
  }
  function renderContinue() {
    var host = document.querySelector('#continue-reading');
    if (!host) return;
    host.setAttribute('hidden', ''); host.innerHTML = '';
    var slug = get(LS.reading, ''); if (!slug) return;
    var r = readingBySlug(slug); if (!r) return;
    var last = get('tmc-lastread-' + slug, '') || r.essays[0];
    var t = esc(state.titles[last] || last);
    host.innerHTML = 'Continue: ' + esc(r.title) + ' — <a class="link-page" href="/essays/' + last + '">' + t + '</a>';
    host.removeAttribute('hidden');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
