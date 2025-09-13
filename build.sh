#!/bin/bash

# 5GLabX Cloud Build Script
# This script ensures consistent builds across all environments

set -e  # Exit on any error

echo "🚀 Starting 5GLabX Cloud build process..."

# Navigate to web directory
cd web

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔍 Checking TypeScript installation..."
which tsc || echo "TypeScript not found in PATH"
npx tsc --version || echo "TypeScript not available via npx"

echo "🔍 Running type checking..."
npx tsc --noEmit

echo "🧹 Running linting..."
npm run lint

echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"

# List the built files
echo "📁 Built files:"
ls -la dist/