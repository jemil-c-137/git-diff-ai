#!/bin/bash
# Script to install the git-diff-ai executable globally on Linux

# Move the executable to /usr/local/bin
sudo mv app/git-diff-ai /usr/local/bin/git-diff-ai

# Clean up the temporary app directory
rm -rf app/

echo "git-diff-ai installed globally. You can run it from anywhere."
