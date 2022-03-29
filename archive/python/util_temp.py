import os
import shutil
import random

TEMP_DIR = os.path.join('.','tmp')

def initialize():
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)
    os.mkdir('tmp')

def tmp_path(fileName: str=None):
    if not fileName:
        fileName = random.sample("ABCDEFGHIJKLMNOPQRSTUVWXYZ",10)
    return os.path.join(TEMP_DIR,fileName)