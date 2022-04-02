import json
import os
import shutil

PATH = os.path.join('.','generated')

if os.path.exists(PATH):
    shutil.rmtree(PATH)

os.makedirs(PATH)


def ref(contents,*path):
    filePath = os.path.join(PATH,*path)
    os.makedirs(os.path.dirname(filePath),exist_ok=True)
    with open(filePath,'w') as file:
        file.write(contents)
    return '/'.join(path)
    