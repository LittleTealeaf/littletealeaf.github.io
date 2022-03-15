import os, shutil, random

class Resource:
    def __init__(self,resource_directory,name='',suffix='',seed=None):
        if seed:
            random.seed(str(seed))
            name = "".join(random.sample('abcdefghijklmnopqrstuvwxyz1234567890',10))
        
        self.path = os.path.join(resource_directory.directory, f'{name}{suffix}')
        self.refpath = resource_directory.reference + f'/{name}{suffix}'
        

class ResourceDirectory:
    def __init__(self,directory,reference=None):
        self.directory = directory
        if reference:
            self.reference = reference
        else:
            self.reference = directory

    def initialize(self):
        if os.path.exists(self.directory) and os.path.isdir(self.directory):
            print(f'Deleting {self.directory}')
            shutil.rmtree(self.directory)
        print(f'Initializing {self.directory}')
        os.makedirs(self.directory)


RESOURCES = ResourceDirectory(os.path.join('.','resources','generated'))
PUBLIC = ResourceDirectory(os.path.join('.','public','resources','generated'),'/resources/generated')

[i.initialize() for i in [RESOURCES,PUBLIC]]

print(RESOURCES.directory)

# def resource(location,name='',suffix='',randomName=False,seed=None):
#     if seed:
#         random.seed(str(seed))
#     if randomName:
#         name = "".join(random.sample('abcdefghijklmnopqrstuvwxyz1234567890',10))
#     return (os.path.join(*location[0],f'{name}{suffix}'),"/".join([*location[1],f'{name}{suffix}']))



# PUBLIC = (['.','public','res','gen'],['%PUBLIC_URL%','res','gen'])
# "The first entry of this tuple contains the path from the project root, the second entry contains the path that source files should use"
# SRC = (['.','pages','res','gen'],['.','pages','gen'])
# "The first entry of this tuple contains the path from the project root, the second entry contains the path that source files should use"

# def initialize_dirs(*dirs):
#     for dir in dirs:
#         path = os.path.join(*dir[0])
#         if os.path.exists(path) and os.path.isdir(path):
#             print(f"Deleting {path}")
#             shutil.rmtree(path)
#         print(f"Initializing {path}")
#         os.makedirs(path)
 
# initialize_dirs(PUBLIC,SRC)

