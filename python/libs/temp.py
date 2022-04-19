import os
import json
import shutil


PATH = os.path.join('.','tmp')

def clean():
    if os.path.exists(PATH):
        shutil.rmtree(PATH)
    os.makedirs(PATH,exist_ok=True)

def store(name,value):
    with open(os.path.join(PATH,f'{name}.json'),'w') as file:
        file.write(json.dumps(value))

def get(name):
    try:
        with open(os.path.join(PATH,f'{name}.json')) as file:
            return json.load(file)
    except:
        return None
