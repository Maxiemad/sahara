// api/summarize.js
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, options } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
    }

    const truncated = text.length > 4000 ? text.slice(0, 4000) + '...[truncated]' : text;
    const bullets = options?.bullets ?? 3;
    const prompt = `Summarize the following email into ${bullets} concise bullet points:\n\n${truncated}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ error: 'OpenAI API failed', details: errText });
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim() || '(no summary)';

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

