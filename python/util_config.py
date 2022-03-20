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

def get_config_file(filename: str):
    data = None
    with open(os.path.join('.','config',filename)) as file:
        data = json.load(file)
    return data