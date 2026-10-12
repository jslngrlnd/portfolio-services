// Plays videos only while near the viewport; loads nothing until then.
(function () {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { v.muted = true; if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
      else if (!v.paused) v.pause();
    });
  }, { rootMargin: '400px 0px' });
  var seen = new WeakSet();
  function scan() {
    document.querySelectorAll('video').forEach(function (v) {
      if (seen.has(v)) return;
      seen.add(v);
      if (v.readyState === 0) v.preload = 'none';
      io.observe(v);
    });
  }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();
