#!/bin/bash

# 5GLabX Cloud Robust Build Script
# This script handles potential Git and build issues

set -e  # Exit on any error

echo "🚀 Starting 5GLabX Cloud robust build process..."

# Ensure we're in the right directory
cd /opt/build/repo || cd /workspace || pwd

echo "📍 Current directory: $(pwd)"
echo "📋 Git status:"
git status --porcelain || echo "Git status check completed"

echo "🔍 Git branch info:"
git branch -a || echo "Git branch check completed"
git log --oneline -1 || echo "Git log check completed"

# Navigate to web directory
cd web

echo "📦 Installing all dependencies..."
npm install --legacy-peer-deps

echo "🔍 Verifying critical dependencies..."
echo "✅ TypeScript: $(npx tsc --version)"
echo "✅ Vite: $(npx vite --version)"
echo "✅ React plugin: $(npm list @vitejs/plugin-react)"

echo "🔧 Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json found"
    echo "📋 JSX configuration: $(grep -o '"jsx": "[^"]*"' tsconfig.json || echo 'Not found')"
    echo "📋 Module resolution: $(grep -o '"moduleResolution": "[^"]*"' tsconfig.json || echo 'Not found')"
else
    echo "⚠️ tsconfig.json not found"
fi

echo "🏗️ Building application..."
echo "📋 Build command: npm run build"
echo "📋 Current directory: $(pwd)"
echo "📋 Files in current directory:"
ls -la | head -10

npm run build

echo "✅ Robust build completed successfully!"

# List the built files
echo "📁 Built files:"
ls -la dist/