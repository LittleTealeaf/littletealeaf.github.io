from fileinput import filename
import os, shutil, random, json

PNG = 'png'
JPEG = 'jpeg'
SVG = 'svg'
WEBP = 'WebP'
JSON = 'json'
HTML='html'
TXT = 'txt'


IMAGES = ['images']
JSONS = ['json']

VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'


class Asset:
    def __init__(self,path=[],name='',suffix='',prefix='',seed=None,type=None):
        path = path.copy()
        if seed:
            random.seed(str(seed))
            name = ''.join(random.sample(VALID_CHARACTERS,15))
        
        parent_directory = os.path.join('.','assets','generated',*path)
        if not os.path.exists(parent_directory):
            print(f'Creating Asset Directory: {parent_directory}')
            os.makedirs(parent_directory)
        if type:
            suffix = f'{suffix}.{type}'

        filename = f'{prefix}{name}{suffix}'
        self.path = os.path.join(parent_directory,filename)
        self.ref = "/".join([*path,filename])
    def exists(self):
        return os.path.exists(self.path)


# Cleaning Directory
def clean_directory():
    path = os.path.join('.','assets','generated')
    if os.path.exists(path):
        print(f'Deleting Directory: {path}')
        shutil.rmtree(path)


def ref_text(text="",asset=None,path=[],type=TXT):
    if not asset:
        asset = Asset(path=path,seed=text,type=type)
    with open(asset.path,'w') as file:
        file.write(text)
    return asset.ref