import os, json
from resutil import *
from githubapi import *

# Compiles the projects json for building
with open(os.path.join('.','resources','projects.json')) as f:
    projects_in = json.load(f)
    projects = []

    for p in projects_in:
        project = {'api':api_github(p['api_url'])}
        project['contributors'] = api_github(project['api']['contributors_url'])
        


        projects.append(project)
    
    with open(resource_src('projects.json'),'w') as w:
        w.write(json.dumps(projects))
