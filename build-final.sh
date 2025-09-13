#!/bin/bash

# 5GLabX Cloud Final Build Script
# This script ensures all dependencies are available and builds successfully

set -e  # Exit on any error

echo "🚀 Starting 5GLabX Cloud final build process..."

# Navigate to web directory
cd web

echo "📦 Installing all dependencies..."
npm install --legacy-peer-deps

echo "🔍 Verifying critical dependencies..."
echo "✅ TypeScript: $(npx tsc --version)"
echo "✅ Vite: $(npx vite --version)"
echo "✅ React plugin: $(npm list @vitejs/plugin-react)"

echo "🏗️ Building application..."
npm run build

echo "✅ Final build completed successfully!"

# List the built files
echo "📁 Built files:"
ls -la dist/