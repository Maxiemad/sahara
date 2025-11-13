# Deployment Guide

## Testing Locally

**Step 1: Start the server** (run from `backend/` directory):
```bash
cd backend
node server.js
```

**Step 2: Test the endpoint** (can run from anywhere):
```bash
curl -X POST http://localhost:3000/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello team... this is an email about...","options":{"bullets":3}}'
```

## Vercel Deployment (Free, No Card Required)

**Recommended Method: GitHub Import**

1. **Push to GitHub** (if not already done):
   ```bash
   cd /Users/akanksha/gmail-email-summarizer
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/gmail-email-summarizer.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click **"Add New..."** → **"Project"**
   - Import repository: `gmail-email-summarizer`
   - Set **Root Directory** to `backend`
   - Click **"Deploy"**

3. **Set Environment Variable:**
   - In project settings → **Environment Variables**
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - Select all environments (Production, Preview, Development)
   - Click **"Save"** and redeploy

4. **Your API endpoints:**
   - Health: `https://your-project.vercel.app/api/health`
   - Summarize: `https://your-project.vercel.app/api/summarize`

**Alternative: CLI Method**

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   cd backend
   vercel --prod
   ```

4. Set environment variable:
   ```bash
   vercel env add OPENAI_API_KEY production
   ```

**To get your OpenAI API key:**
- Visit https://platform.openai.com/account/api-keys
- Login and create a new secret key
- Copy the key (it's only shown once)

**Note:** The `api/` folder contains serverless functions that automatically become `/api/*` endpoints in Vercel.

## Heroku Deployment

**Note:** Heroku now requires account verification with payment information, even for free tier apps. Visit https://heroku.com/verify to verify your account first.

1. Install Heroku CLI (if not already installed):
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Verify your Heroku account (required):
   - Visit https://heroku.com/verify
   - Add payment information (required even for free tier)

4. Create a new Heroku app (run from root `gmail-email-summarizer/` directory):
   ```bash
   cd /Users/akanksha/gmail-email-summarizer
   heroku create your-app-name
   ```

5. Set environment variable:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key_here
   ```

6. Deploy (from root directory):
   ```bash
   git push heroku main
   ```

The `Procfile` is already configured.

## Render.com Deployment (Free, No Card Required)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Render"
   git push origin main
   ```

2. **Create Web Service on Render:**
   - Go to https://render.com
   - Sign in with GitHub
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository: `gmail-email-summarizer`
   - Configure:
     - **Name:** `gmail-email-summarizer`
     - **Environment:** `Node`
     - **Build Command:** `cd backend && npm install`
     - **Start Command:** `cd backend && node server.js`
     - **Root Directory:** `backend`

3. **Set Environment Variable:**
   - In the service settings → **Environment**
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - Click **"Save Changes"**

4. **Deploy:**
   - Render will automatically deploy
   - You'll get a URL like: `https://gmail-email-summarizer.onrender.com`

5. **Your API endpoints:**
   - Health: `https://your-app.onrender.com/health`
   - Summarize: `https://your-app.onrender.com/summarize`

**Note:** Render free tier may spin down after inactivity. First request after spin-down may take ~30 seconds.

## GCP Cloud Run Deployment

1. Build the Docker container (run from `backend/` directory):
   ```bash
   cd backend
   docker build -t gmail-email-summarizer .
   ```

2. Tag for Google Container Registry:
   ```bash
   docker tag gmail-email-summarizer gcr.io/YOUR_PROJECT_ID/gmail-email-summarizer
   ```

3. Push to Google Container Registry:
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/gmail-email-summarizer
   ```

4. Deploy to Cloud Run:
   ```bash
   gcloud run deploy gmail-email-summarizer \
     --image gcr.io/YOUR_PROJECT_ID/gmail-email-summarizer \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars OPENAI_API_KEY=your_key_here
   ```

   Or set the secret in Cloud Run Console:
   - Go to Cloud Run → Your Service → Edit & Deploy New Revision
   - Under "Variables & Secrets", add `OPENAI_API_KEY` as an environment variable

The `Dockerfile` is already configured.

