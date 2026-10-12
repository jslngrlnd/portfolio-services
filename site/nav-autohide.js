// Global nav behaviour, shared by the home page and every case study.
// Ink ground once scrolled (so it stays legible over light sections), and the
// whole bar slides away on downward scroll, returning in place on any scroll up.
(function () {
  if (window.__jslNavInit) return;
  window.__jslNavInit = true;

  var last = window.scrollY;
  var hidden = false;
  var ticking = false;

  function apply() {
    ticking = false;
    var nav = document.getElementById('jsl-nav');
    if (!nav) return;

    if (!nav.style.transition) {
      nav.style.transition = 'transform 260ms cubic-bezier(0.4,0,0.2,1), background 220ms ease';
      nav.style.willChange = 'transform';
    }

    var y = Math.max(0, window.scrollY);
    nav.style.background = y > 40 ? '#120A08' : '#F4290C';

    var dy = y - last;
    // Ignore sub-pixel jitter and rubber-banding at the very top.
    if (Math.abs(dy) > 4) {
      if (dy > 0 && y > nav.offsetHeight) {
        if (!hidden) { hidden = true; nav.style.transform = 'translateY(-100%)'; }
      } else if (dy < 0) {
        if (hidden) { hidden = false; nav.style.transform = 'translateY(0)'; }
      }
      last = y;
    }
    if (y <= 0 && hidden) { hidden = false; nav.style.transform = 'translateY(0)'; }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  document.addEventListener('DOMContentLoaded', apply);
  apply();
})();
