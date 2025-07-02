#!/usr/bin/env node

// Automatic Vercel deployment script for ShopHand
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Deploying ShopHand to Vercel...');

try {
  // Check if Vercel CLI is available
  try {
    execSync('npx vercel --version', { stdio: 'pipe' });
  } catch {
    console.log('Installing Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }

  // Build the project
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Deploy to Vercel
  console.log('Deploying to Vercel...');
  const deployOutput = execSync('npx vercel --prod --yes', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });

  // Extract URL from deployment output
  const urlMatch = deployOutput.match(/https:\/\/[^\s]+/);
  const deploymentUrl = urlMatch ? urlMatch[0] : 'Deployment completed';

  console.log('✅ ShopHand deployed successfully!');
  console.log('🌐 Live URL:', deploymentUrl);
  console.log('\n📋 Next steps:');
  console.log('1. Visit your live website');
  console.log('2. Test user registration and login');
  console.log('3. Configure environment variables in Vercel dashboard');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🔧 Manual deployment steps:');
  console.log('1. Go to vercel.com');
  console.log('2. Import your GitHub repository');
  console.log('3. Deploy automatically');
}