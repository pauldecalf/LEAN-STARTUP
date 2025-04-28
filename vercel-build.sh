#!/bin/bash
npm install
npm run build
# Copier les fichiers nécessaires
cp -r views dist/
cp -r public dist/ 