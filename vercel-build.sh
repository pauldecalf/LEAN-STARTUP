#!/bin/bash

# Installation des dépendances
npm install

# Compilation TypeScript
npm run build

# Copie des fichiers statiques
cp -r views .
cp -r public .

# Copie des fichiers source TypeScript pour le serverless
cp -r src . 