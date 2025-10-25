#!/bin/bash

# KARGA NOT - Production Deployment Script
# Bu script projenizi production'a deploy eder

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║         🚀 KARGA NOT - Production Deployment 🚀           ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if we're on main branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  Warning: You're not on main branch (current: $BRANCH)${NC}"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}❌ You have uncommitted changes!${NC}"
    git status -s
    echo ""
    read -p "Commit changes now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Commit message: " MSG
        git commit -m "$MSG"
        git push
    else
        exit 1
    fi
fi

echo -e "${BLUE}📋 Deployment Checklist:${NC}"
echo ""
echo "1. ✓ Git branch: $BRANCH"
echo "2. ✓ No uncommitted changes"
echo ""

# Frontend deployment
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}📱 FRONTEND DEPLOYMENT (Vercel)${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""

read -p "Deploy frontend to Vercel? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Building frontend...${NC}"
    cd apps/web
    
    # Check if vercel is installed
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}Installing Vercel CLI...${NC}"
        npm install -g vercel
    fi
    
    # Deploy
    echo -e "${BLUE}Deploying to Vercel...${NC}"
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend deployed successfully!${NC}"
    else
        echo -e "${RED}❌ Frontend deployment failed!${NC}"
        exit 1
    fi
    
    cd ../..
else
    echo -e "${YELLOW}⏭️  Frontend deployment skipped${NC}"
fi

echo ""

# Backend deployment
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}⚙️  BACKEND DEPLOYMENT (Railway)${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""

read -p "Deploy backend to Railway? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Building backend...${NC}"
    cd apps/api
    
    # Check if railway is installed
    if ! command -v railway &> /dev/null; then
        echo -e "${YELLOW}Installing Railway CLI...${NC}"
        npm install -g @railway/cli
    fi
    
    # Build
    npm run build
    
    # Deploy
    echo -e "${BLUE}Deploying to Railway...${NC}"
    railway up
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend deployed successfully!${NC}"
    else
        echo -e "${RED}❌ Backend deployment failed!${NC}"
        exit 1
    fi
    
    cd ../..
else
    echo -e "${YELLOW}⏭️  Backend deployment skipped${NC}"
fi

echo ""

# Database migration
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🗄️  DATABASE MIGRATION${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""

read -p "Run database migrations? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Running migrations...${NC}"
    cd apps/api
    
    # Run migration
    npx prisma migrate deploy
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database migrated successfully!${NC}"
    else
        echo -e "${RED}❌ Migration failed!${NC}"
        exit 1
    fi
    
    cd ../..
else
    echo -e "${YELLOW}⏭️  Migration skipped${NC}"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "Your application is now live at:"
echo ""
echo -e "${BLUE}🌐 Frontend:${NC} https://karganot.com"
echo -e "${BLUE}🔧 Backend:${NC}  https://api.karganot.com"
echo -e "${BLUE}📚 API Docs:${NC} https://api.karganot.com/api/docs"
echo ""
echo -e "${YELLOW}📋 Post-Deployment Checklist:${NC}"
echo ""
echo "  [ ] Test login functionality"
echo "  [ ] Test file upload"
echo "  [ ] Test payment flow"
echo "  [ ] Check error monitoring (Sentry)"
echo "  [ ] Verify email sending"
echo "  [ ] Check database backups"
echo ""
echo -e "${GREEN}Good luck! 🚀${NC}"
echo ""
