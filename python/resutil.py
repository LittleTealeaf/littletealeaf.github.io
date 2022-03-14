import os, shutil, random

dir_gen_src = os.path.join('.','src','res','gen')
dir_gen_public = os.path.join('.','public','res','gen')

PUBLIC = (['.','public','res','gen'],['%PUBLIC_URL%','res','gen'])
"The first entry of this tuple contains the path from the project root, the second entry contains the path that source files should use"
SRC = (['.','src','res','gen'],['.','res','gen'])
"The first entry of this tuple contains the path from the project root, the second entry contains the path that source files should use"

def initialize_dirs(*dirs):
    for dir in dirs:
        path = os.path.join(*dir[0])
        if os.path.exists(path) and os.path.isdir(path):
            print(f"Deleting {path}")
            shutil.rmtree(path)
        print(f"Initializing {path}")
        os.makedirs(path)
 
initialize_dirs(PUBLIC,SRC)

def resource_src(name='',ext='',seed=''):
    return resource_old(dir_gen_src,name,ext,seed)

def resource_public(name='',ext='',seed=''):
    return resource_old(dir_gen_public,name,ext,seed)
def resource_old(dir,name='',ext='',seed=''):
    if seed != '':
        random.seed(seed)
    if name == '':
        chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
        name = "".join(random.sample(chars,10))
    
    return os.path.join(dir,f'{name}{ext}')

def resource(location,name='',suffix='',randomName=False,seed=None):
    if seed:
        random.seed(str(seed))
    if randomName:
        name = "".join(random.sample('abcdefghijklmnopqrstuvwxyz1234567890',10))
    return (os.path.join(*location[0],f'{name}{suffix}'),os.path.join(*location[1],f'{name}{suffix}'))
