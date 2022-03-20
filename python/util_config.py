import util_json as json
import os

def config(*path):
    data = json.load(path=os.path.join('.','config','python.json'))
    for key in path:
        data = data[key]
    return data