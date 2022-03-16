import os, shutil, random, json

class Asset:
    def __init__(self,resourcepath,path=[],name='',suffix='',seed=None):
        path = path.copy()
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

PATH_GITHUB = ['github']
PATH_IMAGES = ['images']
PATH_JSON = ['json']
PATH_PROJECTS = ['projects']
PATH_GITHUB_API = PATH_GITHUB + ['api']
PATH_GITHUB_TAGS = PATH_GITHUB + ['tags']
PATH_GITHUB_USERS = PATH_GITHUB + ['users']
PATH_GITHUB_EVENTS = PATH_GITHUB + ['events']



print(PATH_GITHUB_API)

[i.initialize() for i in [ASSETS, PUBLIC]]


def json_save(dictionary,asset):
    print(f'Saving json to {asset.path}')
    with open(asset.path,'w') as w:
        w.write(json.dumps(dictionary))

def json_reference(dictionary,asset):
    json_save(dictionary,asset)
    return asset.refpath