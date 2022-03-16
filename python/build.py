import os, json, requests
from resutil import *
from githubapi import *
from imageutil import *

# Load configuration settings

settings = {}
with open(os.path.join('.','assets','pyconfig.json')) as f:
    settings = json.load(f)

# Loads the user api
user = api_github(f'https://api.github.com/users/{settings["github_username"]}')

# Compiles the projects json for building
with open(os.path.join('.','assets','projects.json')) as f:
    projects = json.load(f)

    for project in projects:
        project['api'] = api_github(project['api_url'])
        def compile_user(api):
            c = {'api':api}
            img = image_format(image_src(api['avatar_url']),{
                'circular': True
            })
            img_resource = Asset(ASSETS,path=['images'],seed=image_hashname(img),suffix='.png')
            
            img.save(img_resource.path)
            c['avatar_url'] = img_resource.refpath
            return c

        project['contributors'] = [compile_user(api) for api in api_github(project['api']['contributors_url'])]

        
        project['api_tags'] = api_github(project['api']['tags_url'])
        project['api_releases'] = api_github(project['api']['releases_url'].replace('{/id}',''))


    with open(Asset(ASSETS,['json'],'projects.json').path,'w') as w:
        w.write(json.dumps(projects))

# Compiles recent events
events = []
events_api_url = user['events_url'].replace("{/privacy}","/public")

while len(events) < settings['event_load_count']:
    page = int(len(events) / 100) + 1
    events_result = api_github(events_api_url,{'per_page':100,'page':page})
    events.extend(events_result[:min(settings['event_load_count'] - len(events),100)])

with open(Asset(ASSETS,path=['json'],name='events.json').path,'w') as w:
    w.write(json.dumps(events))