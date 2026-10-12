// Shared scroll effects for the portfolio. Everything is driven by data attributes
// so a page needs no bespoke logic — just markup plus this script in <helmet>.
//
//   [data-fx-quote]                a line whose words darken gray -> ink, one at a time
//   [data-fx-drift="0.32"]         a clipping frame (value = drift as fraction of frame height) holding an oversized <video>/<img>;
//                                  add [data-fx-card] to the element that rides up over it
//   [data-fx-rise="120"]           content that drifts up as you scroll past
//   [data-fx-arch]                 a tall track whose [data-fx-stage] child pins and sweeps
//                                  its panels along an arch
(function () {
  if (window.__jslFxInit) return;
  window.__jslFxInit = true;

  var raf = null;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // ── Word-by-word ink fill ────────────────────────────────────────────────
  function prepQuote(el) {
    if (el.__prepped) return;
    el.__prepped = true;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(function (w, i) {
      var s = document.createElement('span');
      s.textContent = w;
      s.setAttribute('data-fx-word', '');
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }

  function driveQuote(el) {
    prepQuote(el);
    var words = el.querySelectorAll('[data-fx-word]');
    var n = words.length;
    if (!n) return;
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    var start = vh, end = -r.height * 0.5;
    var p = clamp((start - r.top) / (start - end), 0, 1);
    var from = parseFloat(el.getAttribute('data-fx-from') || '0.3');
    for (var k = 0; k < n; k++) {
      var local = clamp((p * (n + 2) - k) / 2, 0, 1);
      words[k].style.color = 'rgba(18,10,8,' + (from + local * (1 - from)).toFixed(3) + ')';
    }
  }

  // ── Oversized media drifting inside a frame, with a card riding over it ──
  function driveDrift(frame) {
    var media = frame.querySelector('video,img');
    if (!media) return;
    var fr = frame.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    var q = clamp((vh - fr.top) / (vh + fr.height), 0, 1);
    var k = parseFloat(frame.getAttribute('data-fx-drift')) || 0.32;
    media.style.transform = 'translateY(' + (-q * k * fr.height).toFixed(2) + 'px)';
    var card = frame.parentElement && frame.parentElement.querySelector('[data-fx-card]');
    if (card) {
      var travel = parseFloat(card.getAttribute('data-fx-card') || '60') || 60;
      card.style.transform = 'translateY(' + (-q * travel).toFixed(2) + 'px)';
    }
  }

  // ── Pinned arch carousel ─────────────────────────────────────────────────
  function driveArch(track) {
    var stage = track.querySelector('[data-fx-stage]');
    if (!stage) return;
    var panels = [];
    for (var c = 0; c < stage.children.length; c++) {
      if (stage.children[c].tagName !== 'FIGCAPTION') panels.push(stage.children[c]);
    }
    var n = panels.length;
    if (!n) return;
    var r = track.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    var vw = stage.clientWidth || 1;
    var span = Math.max(1, r.height - vh);
    var p = clamp(-r.top / span, 0, 1);

    var pw = panels[0].offsetWidth || 200;
    var step = pw * 1.16;
    // A panel fades out before it can reach the clip edge, so nothing is hard-cut.
    var edge = Math.max(step, vw / 2 - pw / 2);
    var sag = Math.min(vh * 0.16, 190);

    for (var i = 0; i < n; i++) {
      var dx = (i - p * (n - 1)) * step;
      var nx = dx / edge;
      var dy = sag * nx * nx;
      var rot = nx * 15;
      var fade = 1 - clamp((Math.abs(dx) - edge * 0.45) / (edge * 0.55), 0, 1);
      var el = panels[i];
      el.style.transform = 'translate(' + dx.toFixed(1) + 'px, -50%) translateY(' +
        dy.toFixed(1) + 'px) rotate(' + rot.toFixed(2) + 'deg)';
      el.style.opacity = fade.toFixed(3);
      el.style.zIndex = String(100 - Math.round(Math.abs(nx) * 50));
    }
  }

  // ── Content that rises ahead of the scroll ───────────────────────────────
  function driveRise(el) {
    var vh = window.innerHeight || 1;
    var travel = parseFloat(el.getAttribute('data-fx-rise') || '120') || 120;
    var applied = el.__riseApplied || 0;
    var natural = el.getBoundingClientRect().top + applied;
    if (el.__riseTop0 == null) el.__riseTop0 = natural;
    var p = clamp((el.__riseTop0 - natural) / vh, 0, 1);
    var off = p * travel;
    el.__riseApplied = off;
    el.style.transform = 'translateY(' + (-off).toFixed(2) + 'px)';
  }

  // [data-fx-tilt="8"] — a device that tilts gently (value = max degrees) and drifts as it passes through the viewport
  function driveTilt(el) {
    var vh = window.innerHeight || 1;
    var r = el.getBoundingClientRect();
    var q = clamp((vh - r.top) / (vh + r.height), 0, 1) * 2 - 1;
    var max = parseFloat(el.getAttribute('data-fx-tilt') || '8') || 8;
    el.style.transform = 'perspective(1600px) rotateY(' + (-q * max).toFixed(2) + 'deg) rotateX(' + (q * max * 0.4).toFixed(2) + 'deg) rotateZ(' + (-q * max * 0.12).toFixed(2) + 'deg) translateY(' + (-q * 64).toFixed(1) + 'px)';
  }

  function apply() {
    raf = null;
    document.querySelectorAll('[data-fx-tilt]').forEach(driveTilt);
    document.querySelectorAll('[data-fx-quote]').forEach(driveQuote);
    document.querySelectorAll('[data-fx-drift]').forEach(driveDrift);
    document.querySelectorAll('[data-fx-arch]').forEach(driveArch);
    document.querySelectorAll('[data-fx-rise]').forEach(driveRise);
  }

  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(apply);
  }

  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll);
  document.addEventListener('DOMContentLoaded', apply);
  // Late-streaming DCs mount after load; re-run for a short while.
  var ticks = 0;
  var poll = setInterval(function () { apply(); if (++ticks > 20) clearInterval(poll); }, 250);
  apply();
})();
