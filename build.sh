#!/bin/bash

LOG="log.txt"


echo "" > $LOG

echo "Installing Python Requirements"
python3 -m pip install -r ./python/requirements.txt >> $LOG
echo "Python Requirements Installed"

echo "Cleaning build directory"
rm -r ./build >> $LOG
mkdir build/ >> $LOG
echo "New Build Directory Created"