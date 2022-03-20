import json
import os

def config(*path):
    data = {}
    with open(os.path.join('.','config','python.json')) as file:
        data = json.load(file)
    for key in path:
        data = data[key]
    return data