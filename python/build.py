import os, json, requests
from sys import stdin
from resutil import *
from githubapi import *
from imageutil import *

# Load configuration settings

settings = {}
with open(os.path.join('.','assets','pyconfig.json')) as f:
    settings = json.load(f)

# Loads the user api
    

def github_load_user(username=None,url=None,api=None,include=[]):
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

    if 'events' in include:
        user['events'] = json_reference(api_github(api['events_url'].partition('{')[0]),Asset(ASSETS,path=PATH_GITHUB_EVENTS,seed=api['node_id'],suffix='.json'))
    
    for userinclude in ['followers','following']:
        if userinclude in include:
            users = api_github(api[f'{userinclude}_url'].partition('{')[0])
            user[userinclude] = [github_load_user(api=i) for i in users]
    
    return user

def github_user_reference(username=None,url=None,api=None,include=[]):
    user = github_load_user(username,url,api,include)
    return json_reference(user,Asset(ASSETS,path=PATH_GITHUB_USERS,seed=user['api']['node_id'],suffix='.json'))


user = github_load_user(username=settings['github_username'],include=['followers','following','events'])


# Compiles the projects json for building
with open(os.path.join('.','assets','projects.json')) as f:
    projects = []

    PROJECT_VALUES = {
        'description':''
    }

    for project in json.load(f):
        project['api'] = api_github(project['api_url'])

        project['owner'] = project['api']['owner']

        project['contributors'] = [github_user_reference(api=user_api) for user_api in api_github(project['api']['contributors_url'])]
        project['subscribers'] = [github_user_reference(api=user_api) for user_api in api_github(project['api']['subscribers_url'])]
        project['stargazers'] = [github_user_reference(api=user_api) for user_api in api_github(project['api']['stargazers_url'])]
        
        project['tags'] = json_reference(api_github(project['api']['tags_url']),Asset(ASSETS,path=PATH_GITHUB_TAGS,seed=project['api']['node_id'],suffix='.json'))
        project['releases'] = api_github(project['api']['releases_url'].replace('{/id}',''))
        project['events'] = json_reference(api_github(project['api']['events_url']),Asset(ASSETS,path=PATH_GITHUB_EVENTS,seed=project['api']['node_id'],suffix='.json'))

        languages = api_github(project['api']['languages_url'])
        project['languages'] = [{'name':name,'value':languages[name]} for name in languages]

        for key in PROJECT_VALUES:
            if key not in project:
                project[key] = PROJECT_VALUES[key]
        

        projects.append(json_reference(project,Asset(ASSETS,path=PATH_PROJECTS,seed=project['api']['node_id'],suffix='.json')))
    
    json_save(projects,Asset(ASSETS,name='projects.json'))

# Compiles recent events
events = []
events_api_url = user['api']['events_url'].replace("{/privacy}","/public")

while len(events) < settings['event_load_count']:
    page = int(len(events) / 100) + 1
    events_result = api_github(events_api_url,{'per_page':100,'page':page})
    events.extend(events_result[:min(settings['event_load_count'] - len(events),100)])

json_save(events,Asset(ASSETS,name='events.json'))