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

  var BUDGETS = ['Under $1k', '$1–5k', '$5–10k', '$10–20k'];
  var UNSET = 'Drag to set a range';

  function budgetParts(form) {
    return {
      group: form.querySelector('.jsl-budget'),
      range: form.querySelector('[data-budget-range]'),
      unsure: form.querySelector('[data-budget-unsure]'),
      label: form.querySelector('[data-budget-label]')
    };
  }

  function budgetValue(form) {
    var b = budgetParts(form);
    if (b.unsure.checked) return 'Not sure yet';
    return b.group.hasAttribute('data-unset') ? '' : BUDGETS[+b.range.value];
  }

  function syncBudget(form, touched) {
    var b = budgetParts(form);
    if (touched) b.group.removeAttribute('data-unset');
    var unset = b.group.hasAttribute('data-unset');
    b.range.style.setProperty('--fill', unset ? '0%' : (b.range.value / b.range.max * 100) + '%');
    if (b.unsure.checked) b.group.setAttribute('data-unsure', '');
    else b.group.removeAttribute('data-unsure');
    var text = b.unsure.checked ? 'Not sure yet' : unset ? UNSET : BUDGETS[+b.range.value];
    b.label.textContent = text;
    b.range.setAttribute('aria-valuetext', unset ? 'Not set' : BUDGETS[+b.range.value]);
  }

  function resetBudget(form) {
    var b = budgetParts(form);
    b.group.setAttribute('data-unset', '');
    b.unsure.checked = false;
    b.range.value = 0;
    syncBudget(form, false);
  }

  // The form is rendered after load, so wait for it before placing the handle at the start.
  (function initBudget(tries) {
    var form = document.getElementById('jsl-contact-form');
    if (form && form.querySelector('[data-budget-range]')) return resetBudget(form);
    if (tries < 100) setTimeout(function () { initBudget(tries + 1); }, 100);
  })(0);

  document.addEventListener('input', function (e) {
    if (e.target.matches && e.target.matches('#jsl-contact-form [data-budget-range]')) syncBudget(e.target.form, true);
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches && e.target.matches('#jsl-contact-form [data-budget-unsure]')) syncBudget(e.target.form, false);
  });

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
    data.budget = budgetValue(form);

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
          resetBudget(form);
          say('Thanks, your message is on its way. I’ll be in touch soon.', true);
        } else {
          say(res.j.error || 'Something went wrong. Please email john@blancoslinger.land.', false);
        }
      })
      .catch(function () { say('Something went wrong. Please email john@blancoslinger.land.', false); })
      .then(function () { button.disabled = false; button.style.opacity = ''; });
  });
})();
