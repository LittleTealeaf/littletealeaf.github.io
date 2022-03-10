#!/bin/bash

echo "Installing Python Requirements"
python3 -m pip install -r ./python/requirements.txt >> "log.txt"
echo "Python Requirements Installed"


