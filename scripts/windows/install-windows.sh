#!/bin/bash
# Script to install the git-diff-ai executable globally on Windows

# Move the executable to a common directory in PATH (e.g., C:\Program Files\git-diff-ai)
sudo mv app/git-diff-ai.exe "/c/Program Files/git-diff-ai/git-diff-ai.exe"

# Clean up the temporary app directory
rm -rf app/

echo "git-diff-ai installed globally. You can run it from anywhere."
