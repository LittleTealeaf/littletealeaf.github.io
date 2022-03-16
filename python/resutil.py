import os, shutil, random
class Asset:
    def __init__(self,resourcepath,path=[],name='',suffix='',seed=None):
        if seed:
            random.seed(str(seed))
            name = "".join(random.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',10))
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
