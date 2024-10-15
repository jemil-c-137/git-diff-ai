#!/bin/bash
# Script to clean up the git-diff-ai files

# Remove the global command
sudo rm /usr/local/bin/git-diff-ai

# Remove any other temporary or generated files (customize this as needed)
rm -f ./scripts/platforms/macos/git-diff-ai
rm -f ./scripts/platforms/macos/sea-prep.blob
rm -f ./scripts/platforms/macos/sea-config.json
rm -f ./scripts/platforms/macos/bundle.js

echo "Cleanup completed. All git-diff-ai files removed."
