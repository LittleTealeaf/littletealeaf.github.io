import os
import json


PATH = os.path.join('.','tmp')

def store(name,value):
    with open(os.path.join(PATH,f'{name}.json','w')) as file:
        file.write(json.dumps(value))

def get(name):
    with open(os.path.join(PATH,f'{name}.json')) as file:
        return json.load(file)

