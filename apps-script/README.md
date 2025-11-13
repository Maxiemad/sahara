# Gmail Apps Script Setup

## Step 1: Deploy to Vercel

First, deploy your backend to Vercel and get your deployment URL:
- Example: `https://gmail-email-summarizer.vercel.app`

## Step 2: Update the URL in Code.gs

Open `Code.gs` and replace this line:

```javascript
const API_URL = 'https://your-app-name.vercel.app/api/summarize';
```

With your actual Vercel URL:

```javascript
const API_URL = 'https://gmail-email-summarizer.vercel.app/api/summarize';
```

## Step 3: Deploy Apps Script

1. Go to https://script.google.com
2. Create a new project
3. Copy the code from `Code.gs` and `appsscript.json`
4. Save and deploy as a Gmail add-on

## Important Notes

- Make sure your Vercel deployment has `OPENAI_API_KEY` environment variable set
- The API endpoint should be: `https://your-app.vercel.app/api/summarize`
- Test the API first with curl before using in Apps Script

## Testing the API

Before using in Apps Script, test your API:

```bash
curl -X POST https://your-app.vercel.app/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello, this is a test email.","options":{"bullets":3}}'
```

