# Gmail Add-on Deployment Guide

## Step 1: Deploy to Vercel (Backend)

1. Make sure your Vercel deployment is live
2. Set `OPENAI_API_KEY` environment variable in Vercel
3. Disable deployment protection (Settings → Deployment Protection)
4. Test your API:
   ```bash
   curl -X POST https://sahara-git-main-akankshas-projects-55127cf0.vercel.app/api/summarize \
     -H "Content-Type: application/json" \
     -d '{"text":"Test email"}'
   ```

## Step 2: Deploy Gmail Add-on

### Option A: Deploy as Add-on (Recommended)

1. Open Google Apps Script: https://script.google.com
2. Create a new project
3. Copy `Code.gs` and `appsscript.json` content
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ next to "Select type"
6. Choose **Add-on**
7. Click **Deploy**
8. Authorize the script (first time only)

### Option B: Test in Gmail (Development)

1. After deploying, go to Gmail
2. Open any email
3. The add-on should appear in the right sidebar
4. Click on it to see the summary

## Step 3: Verify API Connection

1. Open Apps Script editor
2. Go to **Executions** (left sidebar)
3. Run a test execution
4. Check logs for any errors

## Troubleshooting

### Add-on not showing in Gmail
- Make sure you deployed as **Add-on**, not Web App
- Refresh Gmail
- Check that `appsscript.json` has correct `addOns` configuration

### API errors
- Verify Vercel URL is correct in `Code.gs`
- Check that `OPENAI_API_KEY` is set in Vercel
- Disable deployment protection in Vercel
- Check Apps Script execution logs

### Permission errors
- Make sure all OAuth scopes are approved
- Re-authorize the script if needed

## Production Deployment

For production:
1. Submit for review in Google Workspace Marketplace
2. Or use internal testing with your Google Workspace domain

