# Deploy ShopHand™ to Vercel (Free Alternative)

## Quick Deployment Steps

### 1. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" with GitHub
3. Click "Import Project"
4. Select your ShopHand repository
5. Click "Deploy" - Vercel handles everything automatically

### 2. Add Environment Variables
In Vercel dashboard:
- `DATABASE_URL` - Your PostgreSQL connection
- `SESSION_SECRET` - Random secure string
- `NODE_ENV` - Set to "production"

### 3. Get Free Database
Use Supabase (free PostgreSQL):
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Get connection string from Settings → Database
4. Add as `DATABASE_URL` in Vercel

### 4. Connect Your Namecheap Domain
In Vercel:
1. Go to your project dashboard
2. Click "Domains"
3. Add your domain (e.g., shophandit.com)
4. Vercel shows DNS settings

In Namecheap:
1. Go to "Advanced DNS"
2. Add CNAME record: www → cname.vercel-dns.com
3. Add A record: @ → 76.76.19.61

## Result
- Your ShopHand website will be live at your custom domain
- Free hosting with professional features
- Automatic HTTPS and global CDN
- Full Node.js support

## Alternative: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Automatic deployment

Your ShopHand platform will be live and accessible worldwide!