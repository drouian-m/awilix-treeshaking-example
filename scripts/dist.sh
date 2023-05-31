#!/bin/bash

rm -rf ./dist
pnpm minify
mv dist/index.js dist/dist.js
cp bin/index.js dist/