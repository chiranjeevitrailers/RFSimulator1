#!/bin/bash

# 5GLabX Cloud Build Script
# This script ensures consistent builds across all environments

set -e  # Exit on any error

echo "🚀 Starting 5GLabX Cloud build process..."

# Navigate to web directory
cd web

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔍 Running type checking..."
npm run type-check

echo "🧹 Running linting..."
npm run lint

echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"

# List the built files
echo "📁 Built files:"
ls -la dist/