#!/bin/sh

# Clean gen folder
if [ -d './resources/generated']; then
    rm -r ./resources/generated
fi

# Run python scripts
python3 -m pip install -r ./python/requirements.txt

python3 ./python/build.py