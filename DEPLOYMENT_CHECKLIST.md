# 🎯 DEPLOYMENT CHECKLIST

## ✅ Completed Setup

- [x] Vercel 404 routing issue FIXED
- [x] Railway deployment configs created
- [x] Nixpacks build configs created
- [x] CORS updated for production
- [x] DeepSeek API key configured
- [x] Environment variable templates created
- [x] Deployment scripts ready
- [x] CLI tools installed (Railway, Vercel)

---

## 📋 What You Need to Do

### 1. MongoDB Atlas (REQUIRED - 3 minutes)

**Without MongoDB, your backend won't work!**

1. Go to https://cloud.mongodb.com
2. Create FREE account
3. Build FREE cluster (M0)
4. Create user: `kheladmin` / `[your password]`
5. Add IP: `0.0.0.0/0`
6. Get connection string
7. Save it for Railway

---

### 2. Deploy Gateway to Railway (3 minutes)

```bash
cd /home/ishu/khel/gateway
railway login
railway init
railway up
```

**Then in Railway Dashboard, add these variables:**

```
MONGODB_URI=mongodb+srv://kheladmin:YOUR_PASSWORD@cluster.mongodb.net/khel
JWT_SECRET=kh3l-@i-g4m3-3ng1n3-s3cr3t-2026
ENGINE_URL=https://khel-engine-production.up.railway.app
CLIENT_URL=https://client-mu-lac.vercel.app
NODE_ENV=production
ALLOWED_ORIGINS=https://client-mu-lac.vercel.app
```

---

### 3. Deploy Engine to Railway (2 minutes)

```bash
cd /home/ishu/khel/engine
railway login
railway init
railway up
```

**Then in Railway Dashboard, add these variables:**

```
DEEPSEEK_API_KEY=sk-3697811610df48d8bed50ada01b2a47d
DEEPSEEK_BASE_URL=https://api.deepseek.com
ALLOWED_ORIGINS=https://khel-gateway-production.up.railway.app
APP_NAME=Khel AI Engine
```

---

### 4. Update Gateway with Engine URL (1 minute)

After deploying the engine, copy its URL from Railway dashboard and update the Gateway:

```
ENGINE_URL=https://YOUR-ACTUAL-ENGINE-URL.railway.app
```

---

### 5. Deploy Frontend to Vercel (Already deployed!)

Your frontend is already at: **https://client-mu-lac.vercel.app**

But it needs the backend connected!

**Update Vercel Environment Variables:**

Go to https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add:
```
VITE_API_URL=https://YOUR-GATEWAY-URL.railway.app/api
VITE_SOCKET_URL=https://YOUR-GATEWAY-URL.railway.app
```

Then redeploy:
```bash
cd /home/ishu/khel/client
vercel --prod
```

---

## ✅ Final Testing

1. Open https://client-mu-lac.vercel.app
2. Click "Get Started" → Register
3. Fill form → Submit
4. Should redirect to Dashboard
5. Click "Create" → Test AI game generation
6. If it works → SUCCESS! 🎉

---

## 🐛 Troubleshooting

### Login/Register doesn't work
- Check Gateway is deployed: `https://YOUR-GATEWAY.railway.app/api/health`
- Check VITE_API_URL in Vercel env vars
- Check Railway logs: `railway logs`

### AI Game Generation fails
- Check Engine is deployed: `https://YOUR-ENGINE.railway.app/health`
- Verify DEEPSEEK_API_KEY in Railway engine
- Update ENGINE_URL in gateway

### CORS errors
- Add your Vercel URL to ALLOWED_ORIGINS in gateway
- Redeploy gateway

---

## 📊 Deployment Status

| Service | Status | URL |
|---------|--------|-----|
| Frontend | ✅ Deployed | https://client-mu-lac.vercel.app |
| Gateway | ⏳ Pending | Deploy to Railway |
| Engine | ⏳ Pending | Deploy to Railway |
| MongoDB | ⏳ Pending | Create on Atlas |

---

## 🎯 Next Action

**Run these commands NOW:**

```bash
# 1. Deploy Gateway
cd /home/ishu/khel/gateway
railway login
railway init
railway up

# 2. Deploy Engine
cd /home/ishu/khel/engine
railway login
railway init
railway up

# 3. Update Vercel
cd /home/ishu/khel/client
vercel --prod
```

Then add environment variables in Railway dashboard as shown above!

---

## 💡 Quick Reference

**Railway Dashboard:** https://railway.app/dashboard
**Vercel Dashboard:** https://vercel.com/dashboard
**MongoDB Atlas:** https://cloud.mongodb.com

**Logs:**
```bash
railway logs        # Backend logs
vercel logs         # Frontend logs
```

**Health Checks:**
```bash
curl https://YOUR-GATEWAY.railway.app/api/health
curl https://YOUR-ENGINE.railway.app/health
```

---

## 🆘 Need Immediate Help?

1. Check `DEPLOY_NOW.md` for detailed guide
2. Check `QUICK_START.md` for 5-minute setup
3. Run `./deploy.sh` for automated deployment

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Login/Signup works
- ✅ You can create games with AI
- ✅ Games are playable
- ✅ No console errors

Then you can share your Vercel URL with users! 🚀
