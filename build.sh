#!/bin/bash

LOG="log.txt"


echo "" > $LOG

echo "Cleaning build directory"
rm -r ./build >> $LOG
mkdir build/ >> $LOG
echo "New Build Directory Created"

echo "Cleaning generated directory"
rm -r ./resources/generated
mkdir ./resources/generated
echo "Generated directory initialized"

echo "Run Python Script"
python3 ./python/build.py

echo "Copying Folders:"
cat "./include.txt" | while read line; do
    echo "Including $line"
    cp -r "$line" "build/$line"
done