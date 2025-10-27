# 🚀 KARGANOT - Vercel Deployment Guide

## 📋 Deployment Checklist

### 1️⃣ GitHub Repository
✅ Repository: https://github.com/onurcangunel/KARGANOT
✅ Branch: main
✅ Latest commit pushed

### 2️⃣ Vercel Setup Steps

#### A. Import Project
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `onurcangunel/KARGANOT`
4. Click "Import"

#### B. Configure Project
```
Framework Preset: Next.js
Root Directory: apps/web
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

#### C. Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Next Auth (if using)
NEXTAUTH_URL=https://karganot.vercel.app
NEXTAUTH_SECRET=your-random-secret-key-here

# Database (when backend ready)
DATABASE_URL=postgresql://user:pass@host:5432/karganot

# API URLs
NEXT_PUBLIC_API_URL=https://api.karganot.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### D. Domain Setup (Optional)
1. Go to Project Settings → Domains
2. Add custom domain: `karganot.com` or `www.karganot.com`
3. Add DNS records from your domain provider:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### 3️⃣ Deploy
1. Click "Deploy" button
2. Wait for build to complete (~2-3 minutes)
3. Visit your live site at `https://karganot.vercel.app`

---

## 🔧 Build Configuration

### Next.js Config
File: `apps/web/next.config.js`
- Image optimization enabled
- Static file serving from `/public`
- Video support for hero-bg.mp4

### Package Manager
- Using npm (not yarn/pnpm)
- Node version: 18.x or higher

---

## 📊 Performance Optimizations

✅ **Images**
- Next.js Image component used
- Optimized crow.svg, logo.png, kargalar.png

✅ **Code Splitting**
- Dynamic imports for heavy components
- Route-based code splitting

✅ **Caching**
- Static assets cached (images, videos)
- API routes with cache headers

---

## 🐛 Common Issues & Solutions

### Issue: Build fails with "Module not found"
**Solution:** Check all imports use correct paths
```bash
cd apps/web && npm install
```

### Issue: Images not loading
**Solution:** Verify images are in `/public` folder
```
/public/image/logo.png ✅
/public/videos/hero-bg.mp4 ✅
/public/image/kargalar.png ✅
```

### Issue: 404 on routes
**Solution:** Ensure all pages are in `/src/app` folder
```
/src/app/page.tsx → /
/src/app/belgeler/page.tsx → /belgeler
/src/app/pricing/page.tsx → /pricing
```

---

## 🔄 Continuous Deployment

After initial setup, Vercel will **auto-deploy** on every push to `main`:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
```

---

## 🌐 Preview Deployments

Every pull request gets a **preview URL**:
- PR #1 → `https://karganot-git-feature-onurcangunel.vercel.app`
- Test before merging to main

---

## 📈 Analytics & Monitoring

Vercel Dashboard shows:
- ✅ Build logs
- ✅ Deployment history
- ✅ Performance metrics
- ✅ Error tracking

---

## 🎯 Post-Deployment

### Test Checklist
- [ ] Homepage loads
- [ ] Belgeler page works
- [ ] Upload page functional
- [ ] Pricing page displays
- [ ] Admin page accessible
- [ ] Mobile responsive
- [ ] Images load correctly
- [ ] Videos play

### URLs to Test
```
https://karganot.vercel.app/
https://karganot.vercel.app/belgeler
https://karganot.vercel.app/belgeler/yukle
https://karganot.vercel.app/pricing
https://karganot.vercel.app/admin
https://karganot.vercel.app/profil-detay
https://karganot.vercel.app/hakkimizda
```

---

## 🚨 Important Notes

1. **Backend Not Deployed Yet**
   - Current: Frontend-only with mock data
   - Next step: Deploy backend to Railway/Render/AWS

2. **Database Required**
   - PostgreSQL needed for user data
   - Set `DATABASE_URL` environment variable

3. **File Uploads**
   - Mock S3 service used currently
   - Need real AWS S3 or Cloudinary for production

---

## 📞 Support

Vercel Issues: https://vercel.com/support
GitHub Repo: https://github.com/onurcangunel/KARGANOT

---

**🎉 Ready to Deploy!**

Click here: https://vercel.com/new/onurcangunel/import?repository-url=https%3A%2F%2Fgithub.com%2Fonurcangunel%2FKARGANOT
