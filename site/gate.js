// Password gate. Change the password: replace HASH with the SHA-256 hex of the new password.
(function () {
  var HASH = '9881928f60e14fcbd7a28d2166ee4e8ba456daa9df696159dcae35050762895b';
  var KEY = 'jsl-gate';
  var force = /[?&]lock\b/.test(location.search);
  if (!force && window.top !== window) return;
  try { if (force) localStorage.removeItem(KEY); else if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}
  var hide = document.createElement('style');
  hide.id = 'jsl-gate-hide';
  hide.textContent = 'html{overflow:hidden !important}#dc-root{visibility:hidden !important}';
  document.head.appendChild(hide);
  var g = document.createElement('div');
  g.id = 'jsl-gate';
  g.setAttribute('role', 'dialog');
  g.setAttribute('aria-label', 'Password required');
  g.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#F4290C;color:#FFFFFF;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(20px,4vw,56px);font-family:"Chakra Petch",system-ui,sans-serif';
  g.innerHTML =
    '<p style="margin:0;font-family:Anton,Impact,sans-serif;font-size:clamp(1rem,1.5vw,1.35rem);letter-spacing:0.04em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.55);padding-bottom:10px;align-self:flex-start">// John Blanco-Slingerland</p>' +
    '<form style="margin:0;display:flex;flex-direction:column;gap:clamp(18px,3vh,28px);max-width:560px;width:100%">' +
      '<h1 style="margin:0;font-family:Anton,Impact,sans-serif;font-weight:400;font-size:clamp(2.4rem,7vw,5.6rem);line-height:0.92;text-transform:uppercase">Portfolio</h1>' +
      '<label for="jsl-gate-input" style="font:600 0.78rem/1.3 \'Chakra Petch\',sans-serif;letter-spacing:0.14em;text-transform:uppercase">Enter the password to continue</label>' +
      '<div style="display:flex;flex-wrap:wrap;gap:12px">' +
        '<input id="jsl-gate-input" type="password" autocomplete="current-password" style="flex:1 1 220px;min-width:0;min-height:56px;padding:0 22px;border-radius:999px;border:1.5px solid #FFFFFF;background:transparent;color:#FFFFFF;font:500 1rem/1 \'Chakra Petch\',sans-serif;letter-spacing:0.08em;outline:none">' +
        '<button type="submit" style="min-height:56px;padding:0 30px;border-radius:999px;border:1.5px solid #FFFFFF;background:#FFFFFF;color:#F4290C;font-family:Anton,Impact,sans-serif;font-size:0.95rem;letter-spacing:0.09em;text-transform:uppercase;cursor:pointer">Enter</button>' +
      '</div>' +
      '<p id="jsl-gate-err" aria-live="polite" style="margin:0;min-height:1.4em;font:500 0.9rem/1.4 \'Chakra Petch\',sans-serif"></p>' +
    '</form>' +
    '<p style="margin:0;font:500 0.74rem/1.5 \'Chakra Petch\',sans-serif;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85">Need access? <a href="mailto:blancoslingerland@gmail.com" style="color:#FFFFFF">Get in touch</a></p>';
  function mount() {
    document.body.appendChild(g);
    var input = g.querySelector('input'), err = g.querySelector('#jsl-gate-err');
    input.addEventListener('focus', function () { input.style.background = 'rgba(255,255,255,0.12)'; });
    input.addEventListener('blur', function () { input.style.background = 'transparent'; });
    setTimeout(function () { input.focus(); }, 50);
    g.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.value)).then(function (b) {
        var h = Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
        if (h === HASH) {
          try { localStorage.setItem(KEY, HASH); } catch (e) {}
          hide.remove(); g.remove();
        } else {
          err.textContent = 'That password isn\u2019t right. Try again.';
          input.value = ''; input.focus();
        }
      });
    });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
