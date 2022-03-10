#!/bin/sh
python3 -m pip install -r ./python/requirements.txt

python3 ./python/build_projects.py
python3 ./python/build_indexes.py