// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // or use global fetch in Node 18+
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '1mb' })); // limit to reasonable size

// simple rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60 // adjust based on expected usage
});
app.use(limiter);

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error('OPENAI_API_KEY missing');
  // In production you'd want to fail startup -- keep to help debug
}

// Basic health check
app.get('/health', (req, res) => res.json({ ok: true }));

/**
 * POST /summarize
 * body: { text: string, options?: { bullets: number } }
 */
app.post('/summarize', async (req, res) => {
  try {
    const { text, options } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'text required' });
    }

    // Truncate very long emails to avoid huge tokens
    const MAX_CHARS = 4000;
    const truncated = text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) + '\n\n...[truncated]' : text;

    const bullets = (options && options.bullets) ? Math.min(5, Math.max(1, options.bullets)) : 3;
    const prompt = `Summarize the following email into ${bullets} concise bullet points. Keep bullets short and actionable:\n\n${truncated}`;

    // Call OpenAI Chat Completions
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or gpt-4o, gpt-4, gpt-3.5-turbo — pick based on your access & cost
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

    // Optionally compress summary or sanitize
    return res.json({ summary });

  } catch (err) {
    console.error('server error', err);
    return res.status(500).json({ error: err.message });
  }
});

// Export for Vercel serverless
export default app;

// Start server if not in serverless environment
const PORT = process.env.PORT || 3000;
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
}
