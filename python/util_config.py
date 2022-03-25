import json
import os
import copy
import util_merge as merge


# merging lists should instead replace. UNLESS, the merge INTO is a dict that has the merge type 'append' and a value list

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
    return merge.update(config(*path),user_config)

