# Gmail Email Summarizer

Backend API for summarizing emails using OpenAI.

## Structure

```
gmail-email-summarizer/
├── api/
│   └── summarize.js        ← Vercel serverless function
├── backend/                ← Local development server
├── apps-script/            ← Google Apps Script
├── package.json
├── vercel.json
└── README.md
```

## Deployment

See `backend/DEPLOYMENT.md` for detailed deployment instructions.

## Local Development

For local development, use the Express server in `backend/`:

```bash
cd backend
node server.js
```

## Vercel Deployment

The `api/summarize.js` file is automatically deployed as a serverless function on Vercel.

Endpoint: `https://your-app.vercel.app/api/summarize`

