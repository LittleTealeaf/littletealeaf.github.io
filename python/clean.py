# This script is dedicated to cleaning out all caches, which only happens every 100 build runs

import os
import shutil

if 'RUN_NUMBER' not in os.environ or os.environ['RUN_NUMBER']%100==0:
    print("Cleaning Caches")
    shutil.rmtree(os.path.join('.','cache'))
    os.mkdir(os.path.join('.','cache'))