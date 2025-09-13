#!/bin/bash

# 5GLabX Cloud Simple Build Script
# Minimal build that focuses on getting the app deployed

set -e  # Exit on any error

echo "🚀 Starting 5GLabX Cloud simple build process..."

# Navigate to web directory
cd web

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🏗️ Building application..."
npm run build

echo "✅ Simple build completed successfully!"

# List the built files
echo "📁 Built files:"
ls -la dist/