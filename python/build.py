import os, json, requests
from resutil import *
from githubapi import *
from imageutil import *

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
            img_resource = Resource(PUBLIC,seed=f'{api["avatar_url"]}imageround',suffix='.png')
            
            img.save(img_resource.path)
            c['avatar_url'] = img_resource.refpath

            # img = image_format(image_src(api['avatar_url']),{
            #     'circular': True
            # })
            # img_save_path, c['avatar_src'] = resource(SRC,suffix='.png',randomName=True,seed=f"{api['avatar_url']}imageround")
            # img.save(img_save_path)
            return c

        project['contributors'] = [compile_user(api) for api in api_github(project['api']['contributors_url'])]

        
        project['api_tags'] = api_github(project['api']['tags_url'])
        project['api_releases'] = api_github(project['api']['releases_url'].replace('{/id}',''))


    with open(Resource(RESOURCES,'projects.json').path,'w') as w:
        w.write(json.dumps(projects))


with open(os.path.join('.','resources','projects.json')) as f:
    projects = json.load(f)

    for project in projects:
        project['api'] = api_github(project['api_url'])


    
    
