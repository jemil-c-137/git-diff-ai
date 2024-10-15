#!/bin/bash
# Script to clean up the git-diff-ai files on Linux

# Remove the global command
sudo rm /usr/local/bin/git-diff-ai

# Remove any other temporary or generated files (customize as needed)
rm -f ./scripts/platforms/linux/git-diff-ai
rm -f ./scripts/platforms/linux/sea-prep.blob
rm -f ./scripts/platforms/linux/sea-config.json
rm -f ./scripts/platforms/linux/bundle.js

echo "Cleanup completed. All git-diff-ai files removed."
