import os, shutil, random
from util_config import config


VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

class Asset:
    def __init__(self,dir: list=[],name: str='',suffix: str='',prefix: str='',seed: str=None,type: str=None):
        dir = dir.copy()
        if seed:
            random.seed(str(seed))
            name = ''.join(random.sample(VALID_CHARACTERS,15))
        
        parent_directory = os.path.join(*(config('output','directory') + dir))
        if not os.path.exists(parent_directory):
            print(f'Creating Asset Directory: {parent_directory}')
            os.makedirs(parent_directory)
        if type:
            suffix = f'{suffix}.{type}'

        filename = f'{prefix}{name}{suffix}'
        self.path = os.path.join(parent_directory,filename)
        self.ref = "/".join([*dir,filename])
    
    def exists(self) -> bool:
        return os.path.exists(self.path)


# Cleaning Directory
def initialize() -> None:
    path = os.path.join(*config('output','directory'))
    if os.path.exists(path):
        print(f'Deleting Directory: {path}')
        shutil.rmtree(path)

def config_path(name: str) -> str:
    return os.path.join('.','assets',name)