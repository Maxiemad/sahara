# Vercel Setup Guide (Free, No Card Required)

## Step-by-Step Instructions

### 1. Push to GitHub (if not already done)

```bash
cd /Users/akanksha/gmail-email-summarizer
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gmail-email-summarizer.git
git push -u origin main
```

### 2. Deploy to Vercel via GitHub

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository: `gmail-email-summarizer`
5. Vercel will auto-detect settings:
   - **Framework Preset:** Other
   - **Root Directory:** `backend` (click "Edit" and set to `backend`)
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

### 3. Set Environment Variable

1. In the project settings, go to **"Environment Variables"**
2. Add new variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** (your OpenAI API key from https://platform.openai.com/account/api-keys)
   - **Environment:** Production, Preview, Development (select all)
3. Click **"Save"**

### 4. Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete
3. You'll get a URL like: `https://gmail-email-summarizer.vercel.app`

### 5. Test Your API

Your endpoints will be:
- **Health check:** `https://gmail-email-summarizer.vercel.app/api/health`
- **Summarize:** `https://gmail-email-summarizer.vercel.app/api/summarize`

Test with curl:
```bash
curl -X POST https://gmail-email-summarizer.vercel.app/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello team... this is an email about...","options":{"bullets":3}}'
```

## File Structure

```
backend/
├── api/
│   ├── summarize.js    # Serverless function for /api/summarize
│   └── health.js        # Serverless function for /api/health
├── server.js            # Local development server
├── package.json
├── vercel.json         # Vercel configuration
└── ...
```

## Notes

- **No payment card required** - Vercel free tier is sufficient
- **Automatic deployments** - Every push to GitHub main branch will auto-deploy
- **Serverless functions** - Files in `api/` folder become serverless endpoints
- **Local development** - Still use `node server.js` for local testing

