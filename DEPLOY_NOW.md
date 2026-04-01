# 🚀 KHEL - Deploy with Your DeepSeek API Key

Your DeepSeek API key is already configured: `sk-3697811610df48d8bed50ada01b2a47d`

---

## ⚡ Quick Deploy (10 Minutes)

### Step 1: MongoDB Atlas Setup (3 minutes)

1. Go to https://cloud.mongodb.com
2. Sign up/Login
3. Create FREE cluster (M0)
4. Create database user:
   - Username: `kheladmin`
   - Password: `[create a strong password]`
5. Network Access: Add `0.0.0.0/0` (allow all)
6. Connect → Drivers → Copy connection string
7. Replace `<password>` with your password
8. Save this string for Step 2

Example:
```
mongodb+srv://kheladmin:MyPassword123@cluster0.abc123.mongodb.net/khel
```

---

### Step 2: Deploy Gateway to Railway (3 minutes)

```bash
cd /home/ishu/khel/gateway

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
```

**Add Environment Variables in Railway Dashboard:**

Click your project → Variables → Add these:

```bash
MONGODB_URI=mongodb+srv://kheladmin:YOUR_PASSWORD@cluster.mongodb.net/khel
JWT_SECRET=kh3l-@i-g4m3-3ng1n3-s3cr3t-2026
ENGINE_URL=https://khel-engine-production.up.railway.app
CLIENT_URL=https://khel-psi.vercel.app
NODE_ENV=production
ALLOWED_ORIGINS=https://khel-psi.vercel.app,https://client-mu-lac.vercel.app
```

> Keep ENGINE_URL for now, we'll update it after deploying the engine

---

### Step 3: Deploy Engine to Railway (2 minutes)

```bash
cd /home/ishu/khel/engine

# Deploy (uses same Railway account)
railway init
railway up
```

**Add Environment Variables in Railway Dashboard:**

```bash
DEEPSEEK_API_KEY=sk-3697811610df48d8bed50ada01b2a47d
DEEPSEEK_BASE_URL=https://api.deepseek.com
ALLOWED_ORIGINS=https://khel-gateway-production.up.railway.app,http://localhost:8000
APP_NAME=Khel AI Engine
```

**Copy your Engine URL** from Railway dashboard (e.g., `https://khel-engine-production.up.railway.app`)

---

### Step 4: Update Gateway with Engine URL (1 minute)

Go back to **Gateway project** in Railway dashboard and update:

```bash
ENGINE_URL=https://YOUR-ACTUAL-ENGINE-URL.railway.app
```

---

### Step 5: Deploy Frontend to Vercel (2 minutes)

```bash
cd /home/ishu/khel/client

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Add Environment Variables in Vercel Dashboard:**

Project Settings → Environment Variables → Add:

```bash
VITE_API_URL=https://YOUR-GATEWAY-URL.railway.app/api
VITE_SOCKET_URL=https://YOUR-GATEWAY-URL.railway.app
```

**Redeploy:**
```bash
vercel --prod
```

---

## ✅ Test Your Deployment

1. Open your Vercel URL in browser
2. Click "Get Started" → Create account
3. Login with your credentials
4. Click "Create" → Test AI game generation
5. Play the game!

---

## 🔧 Update Your Vercel Frontend URL

After deploying, update these files with your actual Vercel URL:

**In Railway Gateway project**, update:
```
CLIENT_URL=https://YOUR-ACTUAL-VERCEL-URL.vercel.app
ALLOWED_ORIGINS=https://YOUR-ACTUAL-VERCEL-URL.vercel.app
```

---

## 📊 Your Production URLs

After deployment, you'll have:

| Service | URL | Dashboard |
|---------|-----|-----------|
| Frontend | https://xxx.vercel.app | [Vercel Dashboard](https://vercel.com/dashboard) |
| Gateway API | https://xxx.railway.app/api | [Railway Dashboard](https://railway.app/dashboard) |
| AI Engine | https://xxx.railway.app | [Railway Dashboard](https://railway.app/dashboard) |

---

## 🎯 API Health Check

Test your deployed services:

```bash
# Gateway health
curl https://YOUR-GATEWAY-URL.railway.app/api/health

# Engine health
curl https://YOUR-ENGINE-URL.railway.app/health
```

Both should return: `{"status": "ok"}`

---

## 🐛 Common Issues

### "Cannot connect to database"
- Check MongoDB connection string
- Verify password is correct
- Ensure IP whitelist includes 0.0.0.0/0

### "CORS error" in browser console
- Add your Vercel URL to `ALLOWED_ORIGINS` in Railway gateway
- Redeploy gateway after adding

### "AI generation failed"
- Verify `DEEPSEEK_API_KEY` is set in Railway engine
- Check engine logs: `railway logs`

### 404 on page refresh
- Already fixed in `vercel.json` ✅
- Make sure you redeploy after vercel.json changes

---

## 💡 Pro Tips

1. **Save your Railway project URLs** in a note
2. **Bookmark Railway dashboard** for logs
3. **Use `railway logs`** to debug issues
4. **Check Vercel deployment logs** for frontend errors

---

## 📞 Need Help?

1. Check logs: `railway logs` (in gateway/engine folders)
2. View Vercel logs: `vercel logs`
3. Test API: `https://YOUR-GATEWAY.railway.app/api/health`

---

## 🎉 You're Done!

Your Khel platform is now LIVE with:
- ✅ AI game generation (powered by DeepSeek)
- ✅ User authentication
- ✅ MongoDB database
- ✅ Real-time WebSocket (multiplayer)
- ✅ Production-ready CORS

Share your Vercel URL and start creating games! 🎮
