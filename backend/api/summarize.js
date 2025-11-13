// Vercel serverless function for /api/summarize
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, options } = req.body || {};
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'text required' });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    // Truncate very long emails to avoid huge tokens
    const MAX_CHARS = 4000;
    const truncated = text.length > MAX_CHARS 
      ? text.slice(0, MAX_CHARS) + '\n\n...[truncated]' 
      : text;

    const bullets = (options && options.bullets) 
      ? Math.min(5, Math.max(1, options.bullets)) 
      : 3;
    
    const prompt = `Summarize the following email into ${bullets} concise bullet points. Keep bullets short and actionable:\n\n${truncated}`;

    // Call OpenAI Chat Completions
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const textErr = await response.text();
      console.error('OpenAI error', response.status, textErr);
      return res.status(502).json({ error: 'OpenAI API error', details: textErr });
    }

    const json = await response.json();
    const summary = json?.choices?.[0]?.message?.content?.trim() || '';

    return res.status(200).json({ summary });

  } catch (err) {
    console.error('server error', err);
    return res.status(500).json({ error: err.message });
  }
}

