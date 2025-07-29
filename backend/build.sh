#!/bin/bash
set -e

echo "Installing all dependencies (including dev dependencies)..."
npm ci

echo "Building application..."
npm run build

echo "Build completed successfully!" 