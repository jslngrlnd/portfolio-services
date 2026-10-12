// Contact form handler: validates a project inquiry and emails it via Resend.
// Env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  required
//   CONTACT_TO      inbox that receives inquiries (default below)
//   CONTACT_FROM    verified sender, e.g. "Studio <hello@yourdomain.com>".
//                   Until a domain is verified in Resend, the default test sender
//                   only delivers to the email address on your Resend account.

const TO = process.env.CONTACT_TO || 'blancoslingerland@gmail.com';
const FROM = process.env.CONTACT_FROM || 'Website inquiry <onboarding@resend.dev>';

const LIMITS = { name: 120, email: 200, company: 160, service: 60, budget: 60, timeline: 60, message: 5000, source: 200 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function clean(body) {
  const out = {};
  for (const [k, max] of Object.entries(LIMITS)) {
    out[k] = typeof body[k] === 'string' ? body[k].trim().slice(0, max) : '';
  }
  return out;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (body.website) return res.status(200).json({ ok: true });

  const d = clean(body);
  if (!d.name || !EMAIL_RE.test(d.email) || d.message.length < 10) {
    return res.status(400).json({ error: 'Please add your name, a valid email and a few words about the project.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'The form isn’t set up yet. Please email blancoslingerland@gmail.com.' });
  }

  const rows = [
    ['Name', d.name],
    ['Email', d.email],
    ['Company', d.company],
    ['Project type', d.service],
    ['Budget', d.budget],
    ['Timeline', d.timeline],
    ['Came from', d.source],
  ].filter(([, v]) => v);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${d.message}\n`;
  const html =
    '<table cellpadding="6" style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">' +
    rows.map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('') +
    '</table>' +
    `<p style="font:15px/1.6 system-ui,sans-serif;white-space:pre-wrap">${esc(d.message)}</p>`;

  const subject = `New project inquiry: ${d.name}${d.service ? ' · ' + d.service : ''}`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: d.email, subject, text, html }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'Your message couldn’t be sent. Please try again or email blancoslingerland@gmail.com.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ error: 'Your message couldn’t be sent. Please try again or email blancoslingerland@gmail.com.' });
  }
};
