# ShopHand™ Domain Deployment Guide
## Connecting shophandit.com to Replit

### Overview
This guide walks you through connecting your custom domain **shophandit.com** to your ShopHand™ platform hosted on Replit.

---

## Step 1: Deploy on Replit

1. **Click the "Deploy" button** in your Replit workspace
2. **Choose "Autoscale"** for production deployment
3. **Wait for deployment** - Replit will provide you with a deployment URL like:
   ```
   https://your-app-name.replit.app
   ```
4. **Test the deployment** - Make sure your ShopHand platform works on the .replit.app domain

---

## Step 2: Configure DNS Records

### Option A: Using Your Domain Registrar's DNS
1. **Log into your domain registrar** (where you bought shophandit.com)
2. **Find DNS settings** (usually called "DNS Management" or "Nameservers")
3. **Add these records**:

   ```
   Type: CNAME
   Name: www
   Value: your-app-name.replit.app
   TTL: 3600 (1 hour)
   
   Type: CNAME  
   Name: @
   Value: your-app-name.replit.app
   TTL: 3600 (1 hour)
   ```

### Option B: Using Cloudflare (Recommended)
1. **Sign up for Cloudflare** (free plan works)
2. **Add shophandit.com** to your Cloudflare account
3. **Update nameservers** at your registrar to Cloudflare's nameservers
4. **In Cloudflare DNS**, add:
   ```
   Type: CNAME
   Name: www
   Value: your-app-name.replit.app
   Proxy: Enabled (orange cloud)
   
   Type: CNAME
   Name: @
   Value: your-app-name.replit.app  
   Proxy: Enabled (orange cloud)
   ```

---

## Step 3: Configure Custom Domain in Replit

1. **In your Replit deployment dashboard**:
   - Click on your deployed app
   - Go to "Domains" section
   - Click "Add Custom Domain"
   - Enter: `shophandit.com`
   - Enter: `www.shophandit.com`

2. **Verify domain ownership** following Replit's instructions

3. **Wait for SSL certificate** - Replit automatically provisions HTTPS

---

## Step 4: Update Platform Configuration

Once your domain is connected, update any hardcoded URLs in your platform:

### Environment Variables to Set:
```bash
DOMAIN=shophandit.com
BASE_URL=https://shophandit.com
```

### Update any API endpoints or redirects that reference the old domain

---

## Step 5: Test Your Live Site

1. **Visit https://shophandit.com** - Should load your ShopHand platform
2. **Test all features**:
   - ✓ Customer interface (browsing parts, ordering)
   - ✓ Driver interface (pickup management, tracking)
   - ✓ Business dashboard (analytics, revenue)
   - ✓ Mobile responsiveness
   - ✓ SSL certificate (https://)

3. **Check redirects**:
   - www.shophandit.com → shophandit.com
   - HTTP redirects to HTTPS

---

## DNS Propagation

- **DNS changes take 24-48 hours** to fully propagate worldwide
- **Test from different locations** using tools like whatsmydns.net
- **Clear browser cache** if you see old content

---

## Troubleshooting

### Common Issues:

**"Site can't be reached"**
- Check DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Verify domain isn't expired

**"SSL Certificate Error"** 
- Replit automatically provisions SSL
- May take 10-15 minutes after domain verification
- Contact Replit support if issues persist

**"404 Not Found"**
- Ensure Replit deployment is running
- Check custom domain configuration in Replit dashboard
- Verify DNS CNAME points to correct .replit.app URL

---

## Next Steps After Deployment

1. **Update business cards/marketing** with shophandit.com
2. **Set up Google Analytics** for traffic tracking  
3. **Submit to Google Search Console** for SEO
4. **Configure email** (support@shophandit.com)
5. **Set up monitoring** for uptime/performance

---

## Support

- **Replit Support**: For deployment and domain connection issues
- **Domain Registrar**: For DNS and domain management help
- **Cloudflare Support**: If using Cloudflare for DNS

Your ShopHand™ platform is fully ready for production deployment at shophandit.com!