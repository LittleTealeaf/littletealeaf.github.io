import os, json, requests
from resutil import *
from githubapi import *
from imageutil import *

# Load configuration settings

settings = {}
with open(os.path.join('.','assets','pyconfig.json')) as f:
    settings = json.load(f)

# Loads the user api

def json_save(dictionary,asset):
    print(f'Saving json to {asset.path}')
    with open(asset.path,'w') as w:
        w.write(json.dumps(dictionary))
    

def load_github_user(username=None,url=None,api=None,include=[]):
    if not api:
        if not url:
            url = f"https://api.github.com/users/{username}"
        api = api_github(url)
    
    print(f'Fetching User Information: {api["login"]}')
    user = {
        'api': api
    }
    # get and store the user image
    img = image_format(image_src(api['avatar_url']),{
        'circular': True
    })
    img_resource = Asset(ASSETS,path=['images'],seed=image_hash(img),suffix='.png')
    user['avatar'] = img_resource.refpath
    img.save(img_resource.path)

    # Include Attributes
    for stdinclude in ['organizations','events']:
        if stdinclude in include:
            user[stdinclude] = api_github(api[f'{stdinclude}_url'].partition('{')[0])
    
    for userinclude in ['followers','following']:
        if userinclude in include:
            users = api_github(api[f'{userinclude}_url'].partition('{')[0])
            user[userinclude] = [load_github_user(api=i) for i in users]
    


    return user


user = load_github_user(username=settings['github_username'],include=['followers','following'])

json_save(user,Asset(ASSETS,path=['json','github_users'],name=user['api']['login'],suffix='.json'))


# Compiles the projects json for building
with open(os.path.join('.','assets','projects.json')) as f:
    projects = json.load(f)

    PROJECT_VALUES = {
        'description':''
    }

    for project in projects:
        project['api'] = api_github(project['api_url'])
        def compile_user(api):
            c = {'api':api}
            img = image_format(image_src(api['avatar_url']),{
                'circular': True
            })
            img_resource = Asset(ASSETS,path=['images'],seed=image_hash(img),suffix='.png')
            
            img.save(img_resource.path)
            c['avatar_url'] = img_resource.refpath
            return c

        project['owner'] = project['api']['owner']

        project['contributors'] = [load_github_user(api=user_api) for user_api in api_github(project['api']['contributors_url'])]
        project['subscribers'] = [load_github_user(api=user_api) for user_api in api_github(project['api']['subscribers_url'])]
        project['stargazers'] = [load_github_user(api=user_api) for user_api in api_github(project['api']['stargazers_url'])]
        
        project['api_tags'] = api_github(project['api']['tags_url'])
        project['api_releases'] = api_github(project['api']['releases_url'].replace('{/id}',''))

        languages = api_github(project['api']['languages_url'])
        project['languages'] = [{'name':name,'value':languages[name]} for name in languages]

        for key in PROJECT_VALUES:
            if key not in project:
                project[key] = PROJECT_VALUES[key]


    json_save(projects,Asset(ASSETS,['json'],'projects.json'))

# Compiles recent events
events = []
events_api_url = user['api']['events_url'].replace("{/privacy}","/public")

while len(events) < settings['event_load_count']:
    page = int(len(events) / 100) + 1
    events_result = api_github(events_api_url,{'per_page':100,'page':page})
    events.extend(events_result[:min(settings['event_load_count'] - len(events),100)])

json_save(events,Asset(ASSETS,path=['json'],name='events.json'))