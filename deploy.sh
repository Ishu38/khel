#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# KHEL - Automated Deployment Script
# This script helps you deploy to Railway and Vercel
# ═══════════════════════════════════════════════════════════════════════════

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   KHEL - AI Educational Game Engine Deployment        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

echo ""
echo -e "${GREEN}✓ CLI tools installed${NC}"
echo ""

# Step 1: Deploy Engine (FastAPI)
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Step 1: Deploy AI Engine (FastAPI)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}This will deploy your AI engine to Railway${NC}"
echo ""
read -p "Do you want to deploy the engine now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd engine
    
    # Login to Railway
    echo -e "${BLUE}Logging into Railway...${NC}"
    railway login
    
    # Initialize project
    echo -e "${BLUE}Initializing Railway project...${NC}"
    railway init || railway up
    
    # Add environment variables
    echo -e "${YELLOW}Configure environment variables in Railway dashboard:${NC}"
    echo "  - DEEPSEEK_API_KEY"
    echo "  - ALLOWED_ORIGINS"
    echo ""
    read -p "Press Enter after adding environment variables..."
    
    # Deploy
    echo -e "${GREEN}Deploying engine...${NC}"
    railway up
    
    # Get the deployment URL
    ENGINE_URL=$(railway domain --json 2>/dev/null | grep -o '"url":"[^"]*' | cut -d'"' -f4 || echo "")
    
    if [ -z "$ENGINE_URL" ]; then
        echo -e "${YELLOW}Could not auto-detect URL. Please get it from Railway dashboard.${NC}"
        read -p "Enter your Engine URL: " ENGINE_URL
    fi
    
    echo -e "${GREEN}✓ Engine deployed to: ${ENGINE_URL}${NC}"
    cd ..
else
    echo -e "${YELLOW}Skipping engine deployment. You can deploy later manually.${NC}"
    read -p "Enter your Engine URL (or press Enter to skip): " ENGINE_URL
fi

echo ""

# Step 2: Deploy Gateway (Node.js)
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Step 2: Deploy Gateway (Node.js Backend)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}This will deploy your gateway to Railway${NC}"
echo ""
read -p "Do you want to deploy the gateway now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd gateway
    
    # Login to Railway
    echo -e "${BLUE}Logging into Railway...${NC}"
    railway login
    
    # Initialize project
    echo -e "${BLUE}Initializing Railway project...${NC}"
    railway init || railway up
    
    # Add environment variables
    echo -e "${YELLOW}Configure environment variables in Railway dashboard:${NC}"
    echo "  - MONGODB_URI (MongoDB Atlas connection string)"
    echo "  - JWT_SECRET"
    echo "  - ENGINE_URL (from Step 1)"
    echo "  - CLIENT_URL (your Vercel frontend URL)"
    echo "  - RAZORPAY_KEY_ID (optional)"
    echo "  - RAZORPAY_KEY_SECRET (optional)"
    echo ""
    
    # Set ENGINE_URL if available
    if [ -n "$ENGINE_URL" ]; then
        echo -e "${BLUE}Setting ENGINE_URL...${NC}"
        railway variables set ENGINE_URL=$ENGINE_URL
    fi
    
    read -p "Press Enter after adding environment variables..."
    
    # Deploy
    echo -e "${GREEN}Deploying gateway...${NC}"
    railway up
    
    # Get the deployment URL
    GATEWAY_URL=$(railway domain --json 2>/dev/null | grep -o '"url":"[^"]*' | cut -d'"' -f4 || echo "")
    
    if [ -z "$GATEWAY_URL" ]; then
        echo -e "${YELLOW}Could not auto-detect URL. Please get it from Railway dashboard.${NC}"
        read -p "Enter your Gateway URL: " GATEWAY_URL
    fi
    
    echo -e "${GREEN}✓ Gateway deployed to: ${GATEWAY_URL}${NC}"
    cd ..
else
    echo -e "${YELLOW}Skipping gateway deployment. You can deploy later manually.${NC}"
    read -p "Enter your Gateway URL (or press Enter to skip): " GATEWAY_URL
fi

echo ""

# Step 3: Deploy Frontend (Vercel)
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Step 3: Deploy Frontend (Vercel)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""

if [ -n "$GATEWAY_URL" ]; then
    echo -e "${BLUE}Updating frontend environment variables...${NC}"
    
    # Update .env.production
    cat > client/.env.production << EOF
VITE_API_URL=${GATEWAY_URL}/api
VITE_SOCKET_URL=${GATEWAY_URL}
EOF
    
    echo -e "${GREEN}✓ Updated client/.env.production${NC}"
fi

echo ""
echo -e "${BLUE}Deploying to Vercel...${NC}"
echo ""
read -p "Do you want to deploy to Vercel now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd client
    
    # Build first
    echo -e "${BLUE}Building frontend...${NC}"
    npm run build
    
    # Deploy to Vercel
    echo -e "${GREEN}Deploying to Vercel...${NC}"
    vercel --prod
    
    cd ..
else
    echo -e "${YELLOW}You can deploy manually with: cd client && vercel --prod${NC}"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Update environment variables in Railway dashboard"
echo "2. Update environment variables in Vercel dashboard"
echo "3. Test your application"
echo ""
echo -e "Engine: ${ENGINE_URL:-'Not deployed'}"
echo -e "Gateway: ${GATEWAY_URL:-'Not deployed'}"
echo -e "Frontend: Check your Vercel dashboard"
echo ""
