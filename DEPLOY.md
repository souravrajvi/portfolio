# Deploying to Netlify

Your portfolio is now a 100% static site! 🎉

## Quick Deploy

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Convert to static site"
   git push
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy"

That's it! Your site will be live in ~2 minutes.

## What Changed

- ✅ No backend server needed
- ✅ No database needed  
- ✅ All data is in `client/src/data/portfolio-data.ts`
- ✅ Faster loading (no API calls)
- ✅ Free hosting on Netlify
- ✅ Smaller bundle size (468KB vs 525KB)

## Updating Your Content

Edit `client/src/data/portfolio-data.ts` and push to GitHub. Netlify will auto-deploy!

## Local Development

```bash
npm run dev
```

Visit http://localhost:5173
