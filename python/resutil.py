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