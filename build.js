#!/usr/bin/env node

// Build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building ShopHand for production...');

try {
  // Build frontend
  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Copy static files
  console.log('Copying static assets...');
  if (fs.existsSync('client/public')) {
    execSync('cp -r client/public/* dist/', { stdio: 'inherit' });
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}