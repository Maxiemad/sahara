# How to Enable Gmail Add-on in Gmail

## Problem
Add-on Gmail sidebar mein nahi dikh raha.

## Solution Options

### Option 1: Test Deployment (Development/Testing)

Gmail add-ons ko test karne ke liye, aapko manually enable karna padta hai:

1. **Apps Script Editor mein:**
   - https://script.google.com
   - Apna project open karo
   - **Deploy** → **Test deployments**
   - "Install" ya "Enable" button click karo
   - Gmail open hoga with add-on enabled

2. **Ya direct Gmail mein:**
   - Gmail kholo
   - Settings (gear icon) → **See all settings**
   - **Add-ons** tab
   - "Manage add-ons" click karo
   - Apna add-on enable karo

### Option 2: Use Test Mode

1. **Apps Script Editor:**
   - **Deploy** → **Test deployments**
   - "Add test user" click karo
   - Apna email add karo
   - Save karo

2. **Gmail mein:**
   - Same email account se login karo
   - Add-on automatically enable ho jayega

### Option 3: Publish to Workspace Marketplace (For Production)

1. **Apps Script Editor:**
   - **Deploy** → **Manage deployments**
   - **Publish** → **Publish as add-on**
   - Google Workspace Marketplace submission process follow karo

## Quick Fix: Manual Installation

### Step 1: Get Add-on URL
1. Apps Script Editor → **Deploy** → **Manage deployments**
2. Latest deployment click karo
3. Copy the deployment URL

### Step 2: Install in Gmail
1. Gmail kholo
2. Settings → Add-ons
3. "Get add-ons" click karo
4. Search for your add-on name
5. Install karo

## Alternative: Check if Add-on is Loading

1. **Apps Script Editor:**
   - **Executions** tab (left sidebar)
   - Check if `onGmailMessageOpen` function is being called
   - Agar errors hain, logs check karo

2. **Browser Console:**
   - Gmail kholo
   - F12 press karo (Developer Tools)
   - Console tab check karo
   - Koi errors dikh rahe hain?

## Important Notes

- Gmail add-ons automatically appear **only after installation**
- Development/testing ke liye "Test deployments" use karo
- Production ke liye Workspace Marketplace submission chahiye
- Add-on enable hone mein 1-2 minutes lag sakte hain

