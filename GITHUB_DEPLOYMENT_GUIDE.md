# 🌟 GitHub Setup & First Deployment

Complete step-by-step guide to get MindSphere on GitHub and deployed to the internet.

---

## Step 1: Create GitHub Account & Repository

### 1.1 Create GitHub Account (if needed)

- Go to https://github.com/signup
- Fill in username, email, password
- Verify email
- Select free plan

### 1.2 Create New Repository

1. Click "+" menu (top right)
2. Select "New repository"
3. Name: `mind-sphere`
4. Description: `Premium Psychological & Mental Score Platform`
5. Select "Public" (for GitHub Pages free hosting)
6. Do NOT initialize with README
7. Click "Create repository"

### 1.3 Copy Repository URL

You'll see a page with:

```
https://github.com/YOUR_USERNAME/mind-sphere.git
```

**Copy this URL** - you'll need it next

---

## Step 2: Push Code to GitHub

Open PowerShell and run these commands:

```powershell
# Navigate to your project
cd "c:\Users\sampl\Downloads\mind-sphere-journey-main\mind-sphere-journey-main"

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: MindSphere deployment"

# Create main branch
git branch -M main

# Add remote repository (paste YOUR URL from Step 1.3)
git remote add origin https://github.com/YOUR_USERNAME/mind-sphere.git

# Push to GitHub
git push -u origin main
```

**Wait for the upload to complete...** ⏳

When done, you'll see:

```
✓ Branch 'main' set up to track remote branch 'main'
```

---

## Step 3: Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/mind-sphere
2. You should see all your files
3. Click on a file like `TRANSFORMATION_SUMMARY.md` - it should display the content

✅ **Your code is now on GitHub!**

---

## Step 4: Deploy to Netlify (Recommended)

### Option A: Via Netlify Dashboard (Easy)

1. **Create Netlify Account**
   - Go to https://app.netlify.com/signup
   - Click "Sign up with GitHub"
   - Authorize Netlify

2. **Connect GitHub Repository**
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose "GitHub"
   - Select your `mind-sphere` repository

3. **Configure Build Settings**
   - Build command: `npm run build` ✓
   - Publish directory: `dist` ✓
   - (These are auto-detected from netlify.toml)

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-5 minutes for build and deployment

5. **Get Your URL**
   - You'll receive a URL like: `https://mind-sphere-abc123.netlify.app`
   - **This is your live website!** 🎉

### Option B: Via GitHub Actions (Automatic)

1. **Set Environment Variables in GitHub**
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add `NETLIFY_AUTH_TOKEN`:
     - Get from https://app.netlify.com/user/settings/applications (New access token)
     - Value: [paste the token]
   - Add `NETLIFY_SITE_ID`:
     - Get from Netlify Site settings → General → API ID
     - Value: [paste the site ID]

2. **Automatic Deployment**
   - Every time you push to GitHub, Netlify auto-deploys! 🚀
   - Check your site within 1-2 minutes

---

## Step 5: Deploy to Vercel (Alternative)

### Easy Setup

1. **Create Vercel Account**
   - Go to https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your `mind-sphere` repository
   - Click "Import"

3. **Configure (Auto-Detected)**
   - Framework: Vite ✓
   - Root Directory: ./ ✓
   - Build Command: `npm run build` ✓
   - Output Directory: `dist` ✓

4. **Deploy**
   - Click "Deploy"
   - Wait 1-3 minutes

5. **Get Your URL**
   - You'll receive a URL like: `https://mind-sphere-xyz.vercel.app`
   - **Your app is live!** 🎉

---

## Step 6: Test Your Live Site

1. **Click the link** your platform provided
2. **Test features:**
   - Navigate to Mind Score
   - Take a quick assessment
   - Check Dashboard
   - Create a journal entry
   - Try a game
   - Check localStorage in DevTools

3. **Verify responsive design:**
   - Test on phone/tablet
   - Check all pages load correctly

---

## Step 7: Update Your Code (Future)

After deployment, updating is easy:

```powershell
# Make changes to your code
# Then:

git add .
git commit -m "Your update message"
git push origin main

# Done! Your site auto-updates within 1-2 minutes ✓
```

---

## Step 8: Add Custom Domain (Optional)

### Netlify Custom Domain

1. Go to Netlify dashboard
2. Your site → Site settings → Domain management
3. Click "Add custom domain"
4. Enter your domain (e.g., `mind-sphere.com`)
5. Follow DNS instructions from your domain registrar
6. Done! Site accessible at your custom domain

### Vercel Custom Domain

1. Go to Vercel dashboard
2. Select project → Settings → Domains
3. Add domain
4. Update DNS at your domain registrar
5. Done!

---

## Troubleshooting

### Problem: "git: command not found"

**Solution:** Install Git from https://git-scm.com/download/win

### Problem: "fatal: not a git repository"

**Solution:** Run `git init` in your project directory first

### Problem: "Repository not found"

**Solution:** Check your URL from Step 1.3, make sure YOUR_USERNAME is correct

### Problem: Build fails on deployment

**Solution:**

1. Try `npm run build` locally first to debug
2. Check platform build logs for error messages
3. Ensure all dependencies installed

### Problem: Site shows 404 on navigation

**Solution:** This means SPA routing isn't configured. Verify `netlify.toml` is in repo.

### Problem: Data not saving

**Solution:** Check browser localStorage in DevTools. First visit creates data.

---

## What Happens After Deployment

✅ Your site is live on the internet
✅ Anyone with the URL can visit
✅ All data stored in visitor's browser
✅ Each update takes 1-2 minutes to deploy
✅ Automatic deployment on every GitHub push

---

## Next Steps

1. **Share the link** with users/friends/team
2. **Monitor** the site via platform dashboard
3. **Collect feedback** on features
4. **Make updates** and push to GitHub
5. **Scale up** if needed (add backend, database, etc.)

---

## Helpful Links

**GitHub:**

- Create account: https://github.com/signup
- Create repository: https://repo.new

**Netlify:**

- Create account: https://app.netlify.com/signup
- Site settings: https://app.netlify.com/

**Vercel:**

- Create account: https://vercel.com/signup
- Dashboard: https://vercel.com/dashboard

**Git Documentation:**

- Cheat sheet: https://git-scm.com/cheatsheet
- Tutorial: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics

---

## Quick Reference

### First Time Setup

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mind-sphere.git
git push -u origin main
```

### Regular Updates

```powershell
git add .
git commit -m "Your message"
git push origin main
```

### Check Status

```powershell
git status
git log
```

---

**Ready? Follow the steps above to get your MindSphere app live!** 🚀

---

Last Updated: July 9, 2026
GitHub & Deployment Setup Guide v1.0
