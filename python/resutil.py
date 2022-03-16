from fileinput import filename
import os, shutil, random, json

PNG = 'png'
JPEG = 'jpeg'
SVG = 'svg'
WEBP = 'WebP'
JSON = 'json'

GITHUB = ['github']
GITHUB_USER = GITHUB + ['users']
GITHUB_REPOSITORY = GITHUB + ['repository']
GITHUB_EVENTS = GITHUB + ['events']
GITHUB_RELEASES = GITHUB + ['releases']
GITHUB_USER_LIST = GITHUB + ['groups']
GITHUB_LANGUAGES = GITHUB + ['languages']
PROJECT = ['project']
PROJECT_ATTRIBUTES = PROJECT + ['attributes']
IMAGES = ['images']


class Asset:
    def __init__(self,path=[],name='',suffix='',prefix='',seed=None,type=None):
        path = path.copy()
        if seed:
            random.seed(str(seed))
            name = "".join(random.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',15))
        
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
    print(f'Creating Directory: {path}')
    os.makedirs(path)
