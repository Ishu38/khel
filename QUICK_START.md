# ⚡ Quick Start Deployment - 5 Minutes

## Prerequisites
- Node.js 20+ installed
- Railway account (free): https://railway.app
- Vercel account (free): https://vercel.com
- MongoDB Atlas account (free): https://cloud.mongodb.com

---

## Step-by-Step (5 Minutes)

### 1️⃣ MongoDB Setup (2 minutes)

```
1. Go to https://cloud.mongodb.com
2. Sign up / Login
3. Click "Build a Database" → Choose FREE (M0)
4. Click "Create"
5. Click "Setup Connection Security"
   - Username: kheladmin
   - Password: [generate a strong password]
   - Click "Create User"
6. Click "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
7. Click "Finish and Close"
8. Click "Connect" → "Drivers"
9. Copy the connection string
10. Replace <password> with your password
11. Save this for Step 2
```

---

### 2️⃣ Deploy Gateway (2 minutes)

```bash
# Open terminal
cd /home/ishu/khel/gateway

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up

# Add environment variables (in Railway dashboard)
# Click your project → Variables → Add:
```

**Add these variables in Railway dashboard:**
```
MONGODB_URI=mongodb+srv://kheladmin:YOUR_PASSWORD@cluster.mongodb.net/khel
JWT_SECRET=khel-super-secret-jwt-key-2026-change-this
ENGINE_URL=https://khel-engine-production.up.railway.app
CLIENT_URL=https://khel-psi.vercel.app
NODE_ENV=production
```

> Note: ENGINE_URL will be updated after deploying the engine

---

### 3️⃣ Deploy Engine (1 minute)

```bash
cd /home/ishu/khel/engine

# Deploy
railway init
railway up

# Add environment variables:
```

**Add these variables in Railway dashboard:**
```
DEEPSEEK_API_KEY=sk-3697811610df48d8bed50ada01b2a47d
ALLOWED_ORIGINS=https://khel-gateway-production.up.railway.app
```

---

### 4️⃣ Deploy Frontend (1 minute)

```bash
cd /home/ishu/khel/client

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Add environment variables in Vercel dashboard:**
```
VITE_API_URL=https://YOUR-GATEWAY-URL.railway.app/api
VITE_SOCKET_URL=https://YOUR-GATEWAY-URL.railway.app
```

**Redeploy:**
```bash
vercel --prod
```

---

## ✅ Test Your Deployment

1. Open your Vercel URL
2. Try logging in / signing up
3. Create a game
4. Play the game

---

## 🎯 You're Done! 🎉

Your Khel platform is now live!

**Your URLs:**
- Frontend: https://your-app.vercel.app
- Gateway API: https://your-app.railway.app/api
- Engine: https://your-engine.railway.app

---

## 📱 Share Your App

Share your Vercel URL with teachers, parents, and students!

---

## 🆘 Need Help?

Check the full guide: `DEPLOYMENT_COMPLETE.md`

Or run the automated script:
```bash
cd /home/ishu/khel
./deploy.sh
```
