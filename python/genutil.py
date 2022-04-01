import json
import os
import shutil

PATH = os.path.join('.','generated')

if os.path.exists(PATH):
    shutil.rmtree(PATH)

os.makedirs(PATH)


def ref_json(data,*path):
    with open(f'{os.path.join(PATH, *path)}.json', 'w') as file:
        file.write(json.dumps(data))
    return os.path.join(*path)

def load_json(path):
    data = {}
    with open(path) as file:
        data = json.load(file)
    return data