# CMS Content Automation Setup

This document explains how the CMS content automation works and how to set it up for production.

## 🔄 How It Works

### Content Flow
1. **Content Creation**: You create/edit content via Netlify CMS admin panel
2. **Git Push**: CMS commits changes to GitHub (markdown files + images)
3. **Auto Processing**: Automation detects changes and runs content generation
4. **Static JSON**: Markdown files are converted to optimized JSON for the website
5. **Deployment**: Website is rebuilt and deployed with new content

### Automation Components

#### 1. Build Process Integration (`package.json`)
- **`prebuild`**: Always runs content generation before builds
- **`build:client`**: Includes content generation for client builds
- **`cms:sync`**: Manual script to sync and commit content changes

#### 2. GitHub Actions (`.github/workflows/cms-sync.yml`)
- **Triggers**: Automatically runs when CMS content files change
- **Process**: Generates static content and commits JSON files
- **Deploy**: Triggers Netlify rebuild if configured

#### 3. Netlify Function (`netlify/functions/regenerate-content.js`)
- **Webhook**: Provides HTTP endpoint for manual content regeneration
- **API**: Can be called by external services or manual triggers

## 🚀 Production Setup

### Step 1: GitHub Repository Setup
Your repository is already configured with:
- ✅ GitHub Actions workflow
- ✅ Automatic content generation scripts
- ✅ Build process integration

### Step 2: Netlify Configuration

#### A. Enable Netlify Identity (Already Done)
- ✅ Netlify Identity is enabled
- ✅ Git Gateway is configured
- ✅ CMS admin panel is accessible

#### B. Set Up Build Hook (Optional but Recommended)
1. Go to your Netlify site dashboard
2. Navigate to **Site settings > Build & deploy > Build hooks**
3. Click **Add build hook**
4. Name it "CMS Content Update"
5. Select branch "main"
6. Copy the generated webhook URL

#### C. Configure Environment Variables
In your Netlify site settings, add these environment variables:
- `NETLIFY_BUILD_HOOK_URL`: The webhook URL from step B (optional)

### Step 3: GitHub Secrets (Optional)
If you want GitHub Actions to trigger Netlify builds:
1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and variables > Actions**
3. Add repository secret:
   - `NETLIFY_BUILD_HOOK_URL`: Your Netlify build hook URL

## 🔧 Manual Operations

### Sync Content Manually
```bash
# Generate static content from current markdown files
npm run generate-content

# Generate and commit changes
npm run cms:sync
```

### Trigger Content Regeneration
```bash
# Via Netlify function (when deployed)
curl -X POST https://yoursite.netlify.app/.netlify/functions/regenerate-content

# Or use the GitHub Actions workflow
# Go to Actions tab > CMS Content Sync > Run workflow
```

### Local Development
```bash
# Start development server (includes content generation)
npm run dev

# If you add CMS content locally, run:
npm run generate-content
```

## 📋 Troubleshooting

### Content Not Showing After CMS Update
1. Check if GitHub Actions ran successfully
2. Verify static JSON files were updated
3. Check Netlify build logs for errors
4. Manually trigger content generation if needed

### Build Failures
1. Check if `generateStaticContent.js` script runs without errors
2. Verify all markdown files have valid frontmatter
3. Check for missing required fields in CMS content

### CMS Authentication Issues
1. Verify Netlify Identity is enabled
2. Check Git Gateway configuration
3. Ensure repository permissions are correct

## 🎯 Current Status

✅ **Automated Build Process**: Content generation runs on every build
✅ **GitHub Actions**: Automatically processes CMS changes
✅ **Netlify Function**: Webhook endpoint for manual triggers
✅ **Local Development**: Scripts available for manual content sync

Your CMS automation is fully configured and ready for production! 🚀

## 📊 Monitoring

### Check Content Generation Status
- **GitHub Actions**: Check the "Actions" tab in your repository
- **Netlify Logs**: Check build logs in Netlify dashboard
- **Local**: Run `npm run generate-content` to test manually

### Verify Content Updates
- Check `src/data/staticProducts.json` for new products
- Check `src/data/staticCategories.json` for category changes
- Check `src/data/staticSettings.json` for site settings

The system will automatically handle CMS content updates and keep your website in sync! 🎉
