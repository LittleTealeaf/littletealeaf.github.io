import json
import os
import shutil

PATH = os.path.join('.','build')

if os.path.exists(PATH):
    shutil.rmtree(PATH)

os.makedirs(PATH)
