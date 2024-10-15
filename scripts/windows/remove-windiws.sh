#!/bin/bash
# Script to clean up the git-diff-ai files on Windows

# Remove the global command
sudo rm "/c/Program Files/git-diff-ai/git-diff-ai.exe"

# Remove any other temporary or generated files (customize as needed)
rm -f ./scripts/platforms/windows/git-diff-ai.exe
rm -f ./scripts/platforms/windows/sea-prep.blob
rm -f ./scripts/platforms/windows/sea-config.json
rm -f ./scripts/platforms/windows/bundle.js

echo "Cleanup completed. All git-diff-ai files removed."
