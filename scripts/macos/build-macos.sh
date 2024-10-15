#!/bin/bash
# Script to build the git-diff-ai executable for macOS

# Install dependencies and build the application
npm install
npm run build

cd scripts/macos

# Copy the bundled JavaScript file
cp ../../dist/bundle.js ./bundle.js

# Create the SEA configuration file
echo '{ "main": "bundle.js", "output": "sea-prep.blob" }' > sea-config.json

# Generate the SEA blob
node --experimental-sea-config sea-config.json

# Copy the Node executable
cp $(command -v node) git-diff-ai

# Remove existing signatures from the executable
codesign --remove-signature git-diff-ai

# Inject the SEA blob into the executable
npx postject git-diff-ai NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA

# Sign the executable
codesign --sign - git-diff-ai

# Clean up temporary files
rm sea-prep.blob
rm sea-config.json
rm bundle.js
mkdir -p ../../app/
mv git-diff-ai ../../app/

echo "Build for macOS completed !"
