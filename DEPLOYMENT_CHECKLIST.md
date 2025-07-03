# ✅ CHEXKART DEPLOYMENT CHECKLIST

## PRE-DEPLOYMENT (Complete these first)

- [ ] Code pushed to GitHub repository
- [ ] MongoDB Atlas account created
- [ ] Database cluster created and configured
- [ ] Database user created with read/write permissions
- [ ] Network access configured (allow all IPs)
- [ ] MongoDB connection string obtained

## BACKEND DEPLOYMENT (Railway)

- [ ] Railway account created with GitHub
- [ ] New project created from GitHub repo
- [ ] Environment variables set:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] NODE_ENV=production
  - [ ] PORT=5001
- [ ] Build settings configured (root: backend)
- [ ] Deployment successful
- [ ] Railway URL obtained and saved

## FRONTEND DEPLOYMENT (Vercel)

- [ ] Vercel account created with GitHub
- [ ] Project imported from GitHub
- [ ] Build settings configured:
  - [ ] Framework: Create React App
  - [ ] Root Directory: frontend
  - [ ] Build Command: npm run build
  - [ ] Output Directory: build
- [ ] Environment variables set:
  - [ ] REACT_APP_API_URL (Railway URL + /api)
- [ ] Deployment successful
- [ ] Vercel URL obtained

## POST-DEPLOYMENT CONFIGURATION

- [ ] CORS_ORIGIN updated in Railway (Vercel URL)
- [ ] Both services redeployed with new settings

## TESTING

- [ ] Frontend loads without errors
- [ ] Backend health check responds (Railway-URL/api/health)
- [ ] User registration works
- [ ] User login works
- [ ] Products display correctly
- [ ] Wishlist functionality works
- [ ] Search functionality works
- [ ] Mobile responsive design works
- [ ] No console errors in browser

## URLS TO SAVE

- **Frontend URL:** https://your-app.vercel.app
- **Backend URL:** https://your-app.railway.app
- **GitHub Repo:** https://github.com/YOUR_USERNAME/chexkart-price-comparison
- **MongoDB Cluster:** https://cloud.mongodb.com

## CREDENTIALS TO SAVE

- **MongoDB Username:** chexkart-admin
- **MongoDB Password:** [your-generated-password]
- **JWT Secret:** chexkart-super-secret-jwt-key-2024-production

## NEXT STEPS AFTER DEPLOYMENT

1. **Custom Domain (Optional):**
   - Purchase domain from Namecheap/GoDaddy
   - Configure DNS in Vercel
   - Add SSL certificate (automatic)

2. **Monitoring:**
   - Set up error tracking (Sentry)
   - Monitor performance (Vercel Analytics)
   - Set up uptime monitoring

3. **SEO Optimization:**
   - Add meta tags
   - Create sitemap
   - Submit to Google Search Console

4. **Performance:**
   - Enable Vercel Analytics
   - Optimize images
   - Add caching headers
