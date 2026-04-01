# 🚀 KHEL - Complete Deployment Guide

Transform your educational game platform from localhost to production in minutes!

---

## 📋 What You'll Deploy

1. **AI Engine** (FastAPI) - Handles AI game generation
2. **Gateway** (Node.js/Express) - Main backend API + WebSocket
3. **Frontend** (React/Vite) - User interface on Vercel

---

## 🎯 Quick Deploy (Automated)

### Option 1: Using the Deploy Script (Recommended)

```bash
cd /home/ishu/khel
./deploy.sh
```

This interactive script will:
- Guide you through deploying each service
- Automatically configure environment variables
- Deploy to Railway (backend) and Vercel (frontend)

### Option 2: Manual Deployment

#### Step 1: Deploy AI Engine to Railway

```bash
cd /home/ishu/khel/engine

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

**Configure Environment Variables in Railway:**
- `DEEPSEEK_API_KEY` - Your DeepSeek API key
- `ALLOWED_ORIGINS` - Your gateway URL (add later)

**Get your Engine URL** from Railway dashboard.

---

#### Step 2: Deploy Gateway to Railway

**Before you start:**
1. Create a MongoDB Atlas cluster: https://cloud.mongodb.com
2. Get your connection string

```bash
cd /home/ishu/khel/gateway

# Initialize and deploy
railway init
railway up
```

**Configure Environment Variables in Railway:**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/khel
JWT_SECRET=your-super-secret-key-min-32-chars
ENGINE_URL=https://your-engine-url.railway.app
CLIENT_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
RAZORPAY_KEY_ID=rzp_test_xxx (optional)
RAZORPAY_KEY_SECRET=xxx (optional)
```

**Get your Gateway URL** from Railway dashboard.

---

#### Step 3: Deploy Frontend to Vercel

```bash
cd /home/ishu/khel/client

# Update environment variables
cat > .env.production << EOF
VITE_API_URL=https://your-gateway-url.railway.app/api
VITE_SOCKET_URL=https://your-gateway-url.railway.app
EOF

# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

**Add Environment Variables in Vercel Dashboard:**
Go to Project Settings → Environment Variables:
```
VITE_API_URL=https://your-gateway-url.railway.app/api
VITE_SOCKET_URL=https://your-gateway-url.railway.app
```

**Redeploy:**
```bash
vercel --prod
```

---

## 🔧 Manual Configuration Files

All configuration files have been created for you:

### Gateway (`/gateway`)
- ✅ `railway.json` - Railway deployment config
- ✅ `nixpacks.toml` - Build configuration
- ✅ Updated CORS for production

### Engine (`/engine`)
- ✅ `railway.json` - Railway deployment config
- ✅ `nixpacks.toml` - Build configuration
- ✅ Updated CORS for production

### Frontend (`/client`)
- ✅ `vercel.json` - Vercel deployment config (with rewrites)
- ✅ `.env.production` - Production environment variables
- ✅ Updated routing configuration

---

## 🗄️ MongoDB Setup (Required)

1. **Go to** https://cloud.mongodb.com
2. **Sign up** for a free account
3. **Create a cluster** (free tier M0)
4. **Create a database user** with username/password
5. **Whitelist IP**: 0.0.0.0/0 (allow from anywhere)
6. **Get connection string**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your user password
   - Replace `<cluster-url>` with your cluster URL
   - Example: `mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/khel`

7. **Add to Railway** gateway project as `MONGODB_URI`

---

## 🎨 Alternative Deployment Platforms

### Render (Alternative to Railway)

**Gateway:**
```bash
# Create render.yaml in gateway folder
cat > render.yaml << EOF
services:
  - type: web
    name: khel-gateway
    env: node
    buildCommand: npm install
    startCommand: node src/server.js
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: ENGINE_URL
        sync: false
EOF
```

**Engine:**
```bash
# Create render.yaml in engine folder
cat > render.yaml << EOF
services:
  - type: web
    name: khel-engine
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port \$PORT
EOF
```

### Fly.io

```bash
# Gateway
cd gateway
fly launch --name khel-gateway
fly deploy
fly secrets set MONGODB_URI="..." JWT_SECRET="..."

# Engine
cd engine
fly launch --name khel-engine
fly deploy
```

---

## ✅ Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Gateway deployed to Railway with all env vars
- [ ] Engine deployed to Railway with API key
- [ ] Frontend deployed to Vercel with API URLs
- [ ] Test login/signup functionality
- [ ] Test game creation
- [ ] Test WebSocket (multiplayer)
- [ ] Test payment integration (if using Razorpay)

---

## 🐛 Troubleshooting

### 404 Errors on Vercel
✅ Fixed: `vercel.json` includes rewrites for SPA routing

### API Calls Failing
- Check `VITE_API_URL` in Vercel environment variables
- Ensure it points to your Railway gateway URL
- Must end with `/api`

### WebSocket Not Connecting
- Use `https://` for `VITE_SOCKET_URL` (not `wss://`)
- Railway handles WebSocket upgrade automatically

### CORS Errors
- Add your Vercel URL to `ALLOWED_ORIGINS` in gateway
- Add your gateway URL to engine's `ALLOWED_ORIGINS`

### Database Connection Fails
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string format
- Ensure database user has read/write permissions

---

## 📊 Monitoring & Logs

### Railway
```bash
# View logs
railway logs

# Open dashboard
railway open
```

### Vercel
```bash
# View deployment logs
vercel logs

# Open dashboard
vercel open
```

### MongoDB Atlas
- Go to https://cloud.mongodb.com
- Click "Clusters" → "Collections" to view data
- Use "Logs" for connection monitoring

---

## 💰 Cost Estimate (Free Tier)

| Service | Plan | Cost |
|---------|------|------|
| Railway | Hobby | $5/month (or free with limits) |
| Vercel | Hobby | Free |
| MongoDB Atlas | M0 | Free |
| **Total** | | **~$5/month** |

---

## 🔐 Security Best Practices

1. **Change JWT_SECRET** - Use a strong random string (min 32 chars)
2. **Enable MongoDB IP whitelist** - Only allow Railway IPs
3. **Use environment variables** - Never commit secrets
4. **Enable HTTPS** - Automatic on Vercel/Railway
5. **Rate limiting** - Already configured in gateway
6. **CORS** - Restricted to your domains

---

## 📞 Support

If you encounter issues:
1. Check logs: `railway logs` or Vercel dashboard
2. Review environment variables
3. Test API endpoints: `https://your-gateway-url.railway.app/api/health`
4. Verify MongoDB connection

---

## 🎉 Success!

Your Khel platform is now live and accessible worldwide! 🌍

Share your URL and start creating educational games!
