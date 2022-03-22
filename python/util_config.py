import json
import os
import copy



CONFIG: dict = {}
with open(os.path.join('.','config','python.json')) as file:
    CONFIG = json.load(file)

def config(*path):
    data = copy.deepcopy(CONFIG)
    for key in path:
        data = data[key]
    return data

def get_config_file(filename: str):
    data = None
    with open(os.path.join('.','config',filename)) as file:
        data = json.load(file)
    return data

def compile(user_config: dict,*path):
    def merge(base,updates):
        for key in updates:
            if isinstance(updates[key],dict):
                if key in base:
                    base[key] = merge(base[key],updates[key])
                else:
                    base[key] = updates[key]
            elif isinstance(updates[key],list):
                if key in base:
                    base[key].extend(updates[key])
            else:
                base[key] = updates[key]
        return base
                
    return merge(config(*path),user_config)

