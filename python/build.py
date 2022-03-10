import os, json, shutil, copy
from util_templates import *

templates = load_templates()


def projects():
    project_template = read_file('./templates/projects/project.html')
    projects = json.load(open('./resources/projects.json'))

    for root,dirs,files in os.walk('./projects/'):
        for dir in dirs:
            shutil.rmtree(os.path.join(root,dir))


    for project in projects:
        print(f'Building Project: {project["name"]}')

        variables = copy.copy(templates)
        def add_vars(dict):
            for var in dict:
                variables[var] = dict[var]

        add_vars(project)

        os.mkdir(os.path.join('.','projects',project['name']))

        with open(os.path.join('.','projects',project['name'],'index.html'),'w') as f:
            f.write(project_template.format(**variables))

def build_indexes():

    # For each directory with a template.html
    for dir in map(lambda dirinfo: dirinfo[0], filter(lambda dirinfo: 'template.html' in dirinfo[2], os.walk('.'))):

        # Build templates
        print(f'Building {dir}')

        variables = copy.copy(templates)

        if os.path.exists(os.path.join(dir,'content.json')):
            with open(os.path.join(dir,'content.json')) as f:
                values = json.load(f)
                for key in values:
                    variables[key] = values[key]

        template = read_file(os.path.join(dir,'template.html'))
        with open(os.path.join(dir,'index.html'),'w') as file:
            file.write(template.format(**variables))


projects()