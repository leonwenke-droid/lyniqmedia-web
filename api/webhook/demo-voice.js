/**
 * Proxy für Demo-Voice-Agent – Webhook-URL bleibt serverseitig.
 * In Vercel: N8N_DEMO_WEBHOOK = https://n8n.srv881499.hstgr.cloud/webhook/5c735106-48dd-44dd-841f-ff5ccc212448
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const webhookUrl = process.env.N8N_DEMO_WEBHOOK;
  if (!webhookUrl) {
    return res.status(503).json({ error: 'Webhook nicht konfiguriert' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const text = await response.text();
    res.status(response.status).set('Content-Type', response.headers.get('content-type') || 'application/json');
    res.send(text || '{}');
  } catch (err) {
    console.error('Demo voice webhook error:', err);
    res.status(500).json({ error: 'Interner Fehler' });
  }
};
