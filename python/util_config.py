import json
import os


CONFIG: dict = {}
with open(os.path.join('.','config','python.json')) as file:
    CONFIG = json.load(file)

def config(*path):
    data = CONFIG.copy()
    for key in path:
        data = data[key]
    return data