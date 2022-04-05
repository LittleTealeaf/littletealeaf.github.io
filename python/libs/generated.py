import os
import json
import shutil

GENERATED_DIRECTORY = os.path.join('.','generated')

def initialize():
    shutil.rmtree(GENERATED_DIRECTORY,ignore_errors=True)

def refjson(object,*path):
    ref = '/'.join(path)
    filepath = os.path.join(GENERATED_DIRECTORY,*path)
    os.makedirs(os.path.dirname(filepath),exist_ok=True)
    with open(filepath,'w') as file:
        file.write(json.dumps(object))
    return ref