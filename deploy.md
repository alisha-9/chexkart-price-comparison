# 🚀 CHEXKART DEPLOYMENT GUIDE

## STEP-BY-STEP DEPLOYMENT INSTRUCTIONS

### PHASE 1: SETUP MONGODB ATLAS (5 minutes)

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/atlas
   - Sign up for free account
   - Create new project: "Chexkart"

2. **Create Database Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select region closest to you
   - Cluster name: "chexkart-cluster"

3. **Setup Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `chexkart-admin`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"

4. **Setup Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your actual password
   - Save this connection string!

### PHASE 2: DEPLOY BACKEND TO RAILWAY (10 minutes)

1. **Go to Railway:**
   - Visit: https://railway.app
   - Sign up with GitHub account

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

3. **Configure Backend Service:**
   - Railway will auto-detect your project
   - Click on the service that was created
   - Go to "Settings" tab

4. **Set Environment Variables:**
   - Click "Variables" tab
   - Add these variables:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=chexkart-super-secret-jwt-key-2024-production
   NODE_ENV=production
   PORT=5001
   ```

5. **Configure Build Settings:**
   - Go to "Settings" → "Build"
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

6. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the Railway URL (e.g., https://your-app.railway.app)

### PHASE 3: DEPLOY FRONTEND TO VERCEL (5 minutes)

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up with GitHub account

2. **Import Project:**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build Settings:**
   - Framework Preset: "Create React App"
   - Root Directory: `backend/frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add:
   ```
   REACT_APP_API_URL=https://your-railway-url.railway.app/api
   ```
   (Replace with your actual Railway URL from Step 2)

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at: https://your-app.vercel.app

### PHASE 4: FINAL CONFIGURATION (2 minutes)

1. **Update CORS in Railway:**
   - Go back to Railway dashboard
   - Add environment variable:
   ```
   CORS_ORIGIN=https://your-vercel-url.vercel.app
   ```

2. **Test Your Deployment:**
   - Visit your Vercel URL
   - Test user registration
   - Test product browsing
   - Test wishlist functionality

## 🎉 DEPLOYMENT COMPLETE!

Your Chexkart application is now live at:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-app.railway.app

## 📋 POST-DEPLOYMENT CHECKLIST

- [ ] User registration works
- [ ] User login works
- [ ] Products load correctly
- [ ] Wishlist functionality works
- [ ] Search functionality works
- [ ] Responsive design works on mobile
- [ ] No console errors

## 🔧 TROUBLESHOOTING

**If frontend can't connect to backend:**
1. Check REACT_APP_API_URL in Vercel environment variables
2. Check CORS_ORIGIN in Railway environment variables
3. Ensure both URLs are correct

**If database connection fails:**
1. Check MONGODB_URI in Railway environment variables
2. Ensure MongoDB Atlas allows connections from anywhere
3. Verify username/password in connection string

**If build fails:**
1. Check build logs in respective platforms
2. Ensure all dependencies are in package.json
3. Check for any TypeScript errors (should be none now)
