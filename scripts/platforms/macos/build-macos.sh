#!/bin/bash

npm run build

cd scripts/platforms/macos

cp ../../../dist/bundle.js ./bundle.js

echo '{ "main": "bundle.js", "output": "sea-prep.blob" }' > sea-config.json

node --experimental-sea-config sea-config.json

cp $(command -v node) git-diff-ai

codesign --remove-signature git-diff-ai

npx postject git-diff-ai NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA

codesign --sign - git-diff-ai

rm sea-prep.blob
rm sea-config.json
rm bundle.js
mkdir -p ../../../app/macos
mv git-diff-ai ../../../app/macos