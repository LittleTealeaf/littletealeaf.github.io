import os, json, shutil, copy
from util_templates import *


templates = load_templates()
"Templates loaded from the template directory"

def projects():

    print("Building Projects")

    project_template = read_file('./templates/projects/project.html')
    projects = json.load(open('./resources/projects.json'))

    for root,dirs,files in os.walk('./projects/'):
        for dir in dirs:
            shutil.rmtree(os.path.join(root,dir))


    for project in projects:
        print(f'Building Project: {project["name"]}')

        os.mkdir(os.path.join('.','projects',project['name']))

        with open(os.path.join('.','projects',project['name'],'index.html'),'w') as f:
            f.write(project_template.format(**join_templates(templates,project)))



def compile_indexes():

    print("Compiling Indexes:")

    # For each directory with a template.html
    for dir in map(lambda dirinfo: dirinfo[0], filter(lambda dirinfo: 'template.html' in dirinfo[2], os.walk('.'))):

        # Build templates
        print(f'Compiling index: {dir}')

        # variables = copy.copy(templates)

        content = {}
        if os.path.exists(os.path.join(dir,'content.json')):
            with open(os.path.join(dir,'content.json')) as f:
                content = json.load(f)

        template = read_file(os.path.join(dir,'template.html'))
        with open(os.path.join(dir,'index.html'),'w') as file:
            file.write(template.format(**join_templates(templates,content)))


projects()
compile_indexes()