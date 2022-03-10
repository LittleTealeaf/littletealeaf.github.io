import os, json, shutil, copy
from template_tools import *

templates = load_templates()

project_template = read_file('./templates/projects/project.html')

projects = json.load(open('./resources/projects.json'))


# clean all sub folders
for root,dirs,files in os.walk('./projects/'):
    for dir in dirs:
        shutil.rmtree(os.path.join(root,dir))

for project in projects:
    variables = copy.copy(templates)
    def add_vars(dict):
        for var in dict:
            variables[var] = dict[var]

    add_vars(project)


    os.mkdir(os.path.join('.','projects',project['name']))

    with open(os.path.join('.','projects',project['name'],'index.html'),'w') as f:
        f.write(project_template.format(**variables))