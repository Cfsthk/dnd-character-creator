# Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment", set Source to **GitHub Actions**

2. **Workflow File**
   - The deployment workflow is already configured in `.github/workflows/deploy.yml`
   - It will automatically run on every push to the `main` branch
   - You can also manually trigger it from the Actions tab

3. **First Deployment**
   - Push your code to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at: `https://YOUR_USERNAME.github.io/dnd-character-creator/`

### Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Build the project
npm run build

# 2. The build output is in the dist/ folder
# 3. Deploy the dist folder to your hosting service
```

## Deployment to Other Platforms

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Custom Server

```bash
# Build the project
npm run build

# Copy dist/ folder to your web server
# Ensure your server is configured to serve the index.html for all routes
```

## Environment Configuration

The project uses Vite's base path configuration in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/dnd-character-creator/', // Change this for different deployment paths
})
```

### For Root Domain Deployment

If deploying to a root domain (e.g., `mysite.com` instead of `mysite.com/dnd-character-creator/`):

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Use root path
})
```

## Troubleshooting

### GitHub Pages Not Working

1. Verify GitHub Pages is enabled in repository settings
2. Check that the workflow file exists at `.github/workflows/deploy.yml`
3. Ensure the workflow has run successfully in the Actions tab
4. Wait a few minutes for DNS propagation

### 404 Errors on Refresh

GitHub Pages serves static files. For client-side routing:
- The current setup uses hash-based routing (no special configuration needed)
- If using browser routing, add a 404.html that redirects to index.html

### Build Fails

Check that:
- All dependencies are listed in `package.json`
- Node version is 18 or higher
- Build command `npm run build` works locally

## Monitoring

After deployment, check:
- ✅ Site loads correctly
- ✅ All pages are accessible
- ✅ Images and assets load
- ✅ AI prompt generator works
- ✅ Character creation flow completes

## Performance Optimization

The production build includes:
- Minified JavaScript and CSS
- Tree-shaking for smaller bundle size
- Optimized asset loading
- Tailwind CSS purged of unused styles

Expected bundle sizes:
- JavaScript: ~150-200 KB (gzipped)
- CSS: ~10-20 KB (gzipped)

## Security Notes

- All processing happens client-side
- No backend server required
- No user data is stored or transmitted
- Character data stays in the browser

---

For issues or questions, please open an issue on GitHub.