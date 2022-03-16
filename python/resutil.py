import os, shutil, random, json

class Asset:
    def __init__(self,resourcepath,path=[],name='',suffix='',seed=None):
        if seed:
            random.seed(str(seed))
            name = "".join(random.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',15))
        dir = os.path.join(resourcepath.directory,*path)
        if not os.path.exists(dir):
            print(f"Created Asset Directory: {dir}")
            os.makedirs(dir)
        path.append(f'{name}{suffix}')
        
        self.path = os.path.join(resourcepath.directory,*path)
        self.refpath = "/".join(path)

        print(f'Configured asset {self.refpath} at {self.path}')

class AssetDirectory:
    def __init__(self,*directory):
        self.directory = os.path.join(*directory)

    def initialize(self):
        if os.path.exists(self.directory) and os.path.isdir(self.directory):
             print(f'Deleting {self.directory}')
             shutil.rmtree(self.directory)
        print(f'Initializing {self.directory}')
        os.makedirs(self.directory)

ASSETS = AssetDirectory('.','assets','generated')
PUBLIC = AssetDirectory('.','public','assets','generated')

[i.initialize() for i in [ASSETS,PUBLIC]]


def json_save(dictionary,asset):
    print(f'Saving json to {asset.path}')
    with open(asset.path,'w') as w:
        w.write(json.dumps(dictionary))

def json_reference(dictionary,asset):
    json_save(dictionary,asset)
    return asset.refpath