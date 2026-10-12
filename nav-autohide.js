// Global nav behaviour, shared by the home page and every case study.
// Ink ground once scrolled (so it stays legible over light sections), and the
// whole bar slides away on downward scroll, returning in place on any scroll up.
(function () {
  if (window.__jslNavInit) return;
  window.__jslNavInit = true;


  // Hamburger for narrow viewports (applies to every page that loads this file).
  var css = document.createElement('style');
  css.textContent =
    '.jsl-burger{display:none;margin-left:auto;align-self:center;width:44px;height:44px;border:0;background:transparent;color:inherit;cursor:pointer;padding:0;align-items:center;justify-content:center;flex-direction:column;gap:6px}' +
    '.jsl-burger i{display:block;width:26px;height:2px;background:currentColor;transition:transform 200ms ease,opacity 200ms ease}' +
    '#jsl-nav.jsl-open .jsl-burger i:nth-child(1){transform:translateY(8px) rotate(45deg)}' +
    '#jsl-nav.jsl-open .jsl-burger i:nth-child(2){opacity:0}' +
    '#jsl-nav.jsl-open .jsl-burger i:nth-child(3){transform:translateY(-8px) rotate(-45deg)}' +
    '@media (max-width:760px){' +
      '#jsl-nav nav{flex-wrap:wrap !important;align-items:center !important;padding-bottom:0 !important}' +
      '#jsl-nav nav>a{border-bottom:0 !important;padding-bottom:0 !important}' +
      '.jsl-burger{display:flex}' +
      '#jsl-nav nav>ul{display:none !important}' +
      '#jsl-nav.jsl-open nav>ul{display:flex !important;flex:1 1 100%;flex-direction:column;align-items:stretch !important;margin:0 !important;gap:0 !important;padding:6px 0 18px}' +
      '#jsl-nav.jsl-open nav>ul>li{padding:16px 0 !important;font-size:1rem}' +
      '#jsl-nav.jsl-open nav>ul>li:last-child{padding:18px 0 0 !important;border-bottom:0 !important}' +
    '}';
  document.head.appendChild(css);

  function ensureBurger() {
    var nav = document.getElementById('jsl-nav');
    if (!nav || nav.querySelector('.jsl-burger')) return;
    var inner = nav.querySelector('nav');
    var home = inner && inner.querySelector('a');
    if (!inner || !home) return;
    var b = document.createElement('button');
    b.className = 'jsl-burger';
    b.type = 'button';
    b.setAttribute('aria-label', 'Menu');
    b.setAttribute('aria-expanded', 'false');
    b.innerHTML = '<i></i><i></i><i></i>';
    b.addEventListener('click', function () {
      var open = nav.classList.toggle('jsl-open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    inner.insertBefore(b, home.nextSibling);
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('ul a')) { nav.classList.remove('jsl-open'); b.setAttribute('aria-expanded', 'false'); }
    });
  }
  var tries = 0;
  (function wait() { ensureBurger(); if (!document.querySelector('.jsl-burger') && tries++ < 40) setTimeout(wait, 150); })();

  // In-page anchors: scroll explicitly so links work inside the preview frame too.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var id = decodeURIComponent(a.getAttribute('href').slice(1));
    var el = id ? document.getElementById(id) : null;
    if (id && !el) return;
    e.preventDefault();
    var y = 0;
    if (el && id !== 'top') {
      var m = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      y = el.getBoundingClientRect().top + window.scrollY - m;
    }
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    try { history.replaceState(null, '', '#' + id); } catch (_) {}
  });

  var last = window.scrollY;
  var hidden = false;
  var ticking = false;

  function apply() {
    ticking = false;
    var nav = document.getElementById('jsl-nav');
    if (!nav) return;
    ensureBurger();

    if (!nav.style.transition) {
      nav.style.transition = 'transform 260ms cubic-bezier(0.4,0,0.2,1), background 220ms ease';
      nav.style.willChange = 'transform';
    }

    var y = Math.max(0, window.scrollY);
    nav.style.background = (y > 40 || nav.classList.contains('jsl-open')) ? '#120A08' : '#F4290C';

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
