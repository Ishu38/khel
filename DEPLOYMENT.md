# 🚀 Vercel Deployment Guide for Khel

## ⚠️ Critical: Backend API Required

Your frontend is currently configured to connect to `http://localhost:3001/api`, which **only works on your local machine**. For Vercel to work, you need to:

### Option 1: Deploy Backend to a Public URL (Recommended)

1. **Deploy your gateway** (Node.js backend) to a service like:
   - **Railway**: https://railway.app
   - **Render**: https://render.com
   - **Fly.io**: https://fly.io
   - **Vercel** (for the gateway folder)

2. **Deploy your engine** (FastAPI backend) to:
   - **Railway**
   - **Render**
   - **Fly.io**

3. **Update environment variables** in Vercel:
   ```
   VITE_API_URL=https://your-gateway-url.com/api
   VITE_SOCKET_URL=wss://your-gateway-url.com
   ```

### Option 2: Use Vercel Serverless Functions

You can move your gateway routes to Vercel's serverless functions in an `api/` folder.

---

## 📋 Deployment Steps

### 1. Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to project
cd /home/ishu/khel

# Deploy
vercel --prod
```

### 2. Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and add:

```
VITE_API_URL=https://your-backend-url.com/api
VITE_SOCKET_URL=https://your-backend-url.com
```

### 3. Rebuild on Vercel

After setting environment variables, trigger a new deployment:

```bash
vercel --prod
```

---

## 🔧 Configuration Files

### `vercel.json` (Root)
- Configures build command
- Sets up SPA rewrites for React Router
- Adds caching headers for assets

### `client/vercel.json`
- Vite-specific configuration
- Also includes rewrites for client-side routing

### `client/.env.production`
- Production environment variables
- **Update this with your actual backend URL**

---

## 🐛 Common Issues & Solutions

### 404 on Page Refresh
✅ **Fixed:** Added `rewrites` in `vercel.json` to redirect all routes to `index.html`

### API Calls Failing
❌ **Problem:** `VITE_API_URL` points to localhost
✅ **Solution:** Update to your deployed backend URL

### WebSocket Not Connecting
❌ **Problem:** `VITE_SOCKET_URL` uses `http://` instead of `wss://`
✅ **Solution:** Use `wss://` for production WebSocket connections

---

## 📝 Quick Checklist

- [ ] Deploy backend (gateway) to a public URL
- [ ] Update `VITE_API_URL` in Vercel environment variables
- [ ] Update `VITE_SOCKET_URL` in Vercel environment variables
- [ ] Remove localhost references from `.env.production`
- [ ] Trigger new deployment on Vercel
- [ ] Test all routes: `/`, `/explore`, `/create`, `/login`, etc.
- [ ] Test API connectivity (login, game creation, etc.)

---

## 🎯 Next Steps

1. **Deploy your backend first** (gateway + engine)
2. **Get the public URL** for your gateway
3. **Update Vercel environment variables** with the backend URL
4. **Redeploy** the frontend

For help deploying the backend, check:
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Vercel Functions: https://vercel.com/docs/functions
