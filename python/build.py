import os, json, requests
from resutil import *
from githubapi import *
from imageformatting import *

# Compiles the projects json for building
with open(os.path.join('.','resources','projects.json')) as f:
    projects = json.load(f)

    for project in projects:
        project['api'] = api_github(project['api_url'])

        def compile_user(api):
            c = {'api':api}
            img = image_format(image_src(api['avatar_url']),{
                'circular': True
            })
            c['avatar_src'] = resource_src(ext='.png')
            img.save(c['avatar_src'])
            return c

        project['contributors'] = [compile_user(api) for api in api_github(project['api']['contributors_url'])]

        
        project['api_tags'] = api_github(project['api']['tags_url'])
        project['api_releases'] = api_github(project['api']['releases_url'].replace('{/id}',''))
    
    with open(resource_src('projects.json'),'w') as w:
        w.write(json.dumps(projects))
