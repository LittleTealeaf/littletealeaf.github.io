#!/bin/bash

# Recursively finds all `script.py` files and executes them within their own directory
base_dir=$(pwd)

for dir in $(python3 ./scripts/findscripts.py); do
    cd $dir
    python3 script.py
    cd $base_dir
done