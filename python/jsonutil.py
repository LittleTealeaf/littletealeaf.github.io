import os, json
from assetutil import *



def load_json(path):
    "Reads a json object from a path"
    dict = None
    with open(path) as file:
        dict = json.load(file)
    return dict

def save_json(dict,asset):
    with open(asset.path,'w') as file:
        file.write(json.dumps(dict))

def ref_json(dict,asset=None):
    """
    Saves a json to an asset. If no asset is given, then it will store the asset
    in the 'json' folder, with a name randomized by its contents
    """
    json_string = json.dumps(dict)
    if not asset:
        asset = Asset(path=JSONS,seed=json_string,type=JSON)

    with open(asset.path,'w') as file:
        file.write(json_string)

    return asset.ref
    
def json_asset(asset):
    return load_json(asset.path)