// Contact form: submits #jsl-contact-form to /api/contact, and preselects the project
// type when a visitor arrives from a "Discuss a … project" button.
(function () {
  var SERVICES = { ux: 'UX', brand: 'Brand', strategy: 'Strategy', web: 'Web', app: 'App' };
  var source = '';
  try {
    var ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.origin === location.origin) {
      var m = /Case Study - (.+?)\.dc\.html/.exec(decodeURIComponent(ref.pathname));
      if (m) source = 'Case study: ' + m[1];
    }
  } catch (e) {}

  function pick(service) {
    var input = document.querySelector('#jsl-contact-form input[name="service"][value="' + service + '"]');
    if (input) input.checked = true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$="#contact"]');
    if (!a) return;
    var m = /discuss an? (\w+)/i.exec(a.textContent || '');
    if (m && SERVICES[m[1].toLowerCase()]) {
      pick(SERVICES[m[1].toLowerCase()]);
      if (!source) source = (a.textContent || '').trim();
    }
  });

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.id !== 'jsl-contact-form') return;
    e.preventDefault();
    var status = form.querySelector('[data-form-status]');
    var button = form.querySelector('button[type="submit"]');
    var fd = new FormData(form);
    var data = { source: source };
    fd.forEach(function (v, k) { data[k] = v; });

    function say(msg, ok) {
      status.textContent = msg;
      status.style.color = ok ? '#FFFFFF' : '#120A08';
      status.style.fontWeight = ok ? '' : '600';
    }
    if (!data.name || !data.email || !data.message || data.message.trim().length < 10) {
      say('Please add your name, email and a few words about the project.', false);
      return;
    }
    button.disabled = true;
    button.style.opacity = '0.6';
    say('Sending…', true);

    fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          say('Thanks, your message is on its way. I’ll be in touch soon.', true);
        } else {
          say(res.j.error || 'Something went wrong. Please email john@blancoslinger.land.', false);
        }
      })
      .catch(function () { say('Something went wrong. Please email john@blancoslinger.land.', false); })
      .then(function () { button.disabled = false; button.style.opacity = ''; });
  });
})();
