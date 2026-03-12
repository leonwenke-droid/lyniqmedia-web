/**
 * Proxy für KI-Chatbot – Webhook-URL bleibt serverseitig.
 * In Vercel: N8N_CHATBOT_WEBHOOK = https://n8n.srv881499.hstgr.cloud/webhook/2fca4c77-a3d3-4977-8197-4faf93ce08a8
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const webhookUrl = process.env.N8N_CHATBOT_WEBHOOK;
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
    console.error('Chatbot webhook error:', err);
    res.status(500).json({ error: 'Interner Fehler' });
  }
};
