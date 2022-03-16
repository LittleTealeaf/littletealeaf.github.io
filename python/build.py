import os, json, requests
from sys import stdin
from resutil import *
from githubapi import *
from imageutil import *

# Run Initialization Scripts
clean_directory()

settings = {}
with open(os.path.join('.','assets','pyconfig.json')) as f:
    settings = json.load(f)

def save_json(asset,dict):
    with open(asset.path,'w') as w:
        w.write(json.dumps(dict))

def reference_json(asset,json):
    save_json(asset,json)
    return asset.ref

def fetch_json(asset,fetch,fetch_params={}):
    if not asset.exists():
        print(f'Fetching Asset: {asset.ref}')
        with open(asset.path,'w') as w:
            w.write(json.dumps(fetch(**fetch_params)))
    return asset.ref

def reference_image(img):
    asset = Asset(IMAGES,seed=image_hash(img),type=PNG)
    img.save(asset.path)
    return asset.ref
        
def reference_github_user(username=None,url=None,api=None,include=[]):
    if not url:
        if username:
            url = f'https://api.github.com/users/{username}'
        elif api:
            url = api['url']

    asset = Asset(path=GITHUB_USER,seed=url,type=JSON)

    def fetchUser(api=None,url=None,include=[]):
        if not api:
            api = api_github(url)
        user = {
            'api': api,
            'avatar': reference_image(image_format(image_src(api['avatar_url']),{'circular': True}))
        }

        return user

    return fetch_json(asset,fetchUser,{'url': url, 'include': include, 'api': api})
    # if not api:
    #     if not url:
    #         url = f"https://api.github.com/users/{username}"
    #     api = api_github(url)

def reference_api_github(url,path=GITHUB):
    asset = Asset(path=path,seed=url,type=JSON)
    return fetch_json(asset,lambda: api_github(url))



with open(os.path.join('.','assets','projects.json')) as p:
    projects = []

    for project_ref in json.load(p):
        # api = api_github(project_ref['api_url'])
        project = {
            'api': reference_api_github(project_ref['api_url'],GITHUB_REPOSITORY)
        }

        with open(os.path.join('.','assets','generated',project['api'])) as api_file:
            api = json.load(api_file)
            project.update({
                'contributors': reference_json(Asset(GITHUB_USER_LIST,type=JSON,seed=api['contributors_url']),[reference_github_user(api=user_api) for user_api in api_github(api['contributors_url'])]),
                'subscribers': reference_json(Asset(GITHUB_USER_LIST,type=JSON,seed=api['subscribers_url']),[reference_github_user(api=user_api) for user_api in api_github(api['subscribers_url'])]),
                'stargazers': reference_json(Asset(GITHUB_USER_LIST,type=JSON,seed=api['stargazers_url']),[reference_github_user(api=user_api) for user_api in api_github(api['stargazers_url'])]),
                'languages': reference_json(Asset(GITHUB_LANGUAGES,type=JSON,seed=api['languages_url']),api_github(api['languages_url'])),
                'events': reference_api_github(api['events_url'],GITHUB_EVENTS),
                'releases': reference_api_github(api['releases_url'].replace('{/id}',''),GITHUB_RELEASES)
            })

        if 'attributes' in project_ref:
            project['attributes'] = reference_json(Asset(PROJECT_ATTRIBUTES,type=JSON,seed=project_ref['api_url']),project_ref['attributes'])
        
        projects.append(reference_json(Asset(path=PROJECT,seed=project_ref['api_url'],type=JSON),project))
    
    save_json(Asset(name='projects.json'),projects)
        
        # project['contributors'] = [github_user_reference(api=user_api) for user_api in api_github(api['contributors_url'])]
        
        


# def github_load_user(username=None,url=None,api=None,include=[]):

    
#     print(f'Fetching User Information: {api["login"]}')
#     user = {
#         'api': api
#     }
#     # get and store the user image
#     img = image_format(image_src(api['avatar_url']),{
#         'circular': True
#     })
#     img_resource = Asset(ASSETS,path=['images'],seed=image_hash(img),suffix='.png')
#     user['avatar'] = img_resource.refpath
#     img.save(img_resource.path)

#     if 'events' in include:
#         user['events'] = json_reference(api_github(api['events_url'].partition('{')[0]),Asset(ASSETS,path=PATH_GITHUB_EVENTS,seed=api['node_id'],suffix='.json'))
    
#     for userinclude in ['followers','following']:
#         if userinclude in include:
#             users = api_github(api[f'{userinclude}_url'].partition('{')[0])
#             user[userinclude] = [github_load_user(api=i) for i in users]
    
#     return user





# def github_user_reference(username=None,url=None,api=None,include=[]):

#     def create_asset(api):
#         return Asset(ASSETS,path=PATH_GITHUB_USERS,seed=api['node_id'],suffix='.json')

#     if api:
#         asset = create_asset(api)
#         if os.path.exists(asset.path):
#             print(f'Skipping Fetching User: {api["login"]}')
#             return asset.refpath
#     user = github_load_user(username,url,api,include)
#     return json_reference(user,create_asset(user['api']))    


# user = github_load_user(username=settings['github_username'],include=['followers','following','events'])


# # Compiles the projects json for building
# with open(os.path.join('.','assets','projects.json')) as f:
#     projects = []

#     PROJECT_VALUES = {
#         'description':''
#     }

#     for project in json.load(f):
#         project['api'] = api_github(project['api_url'])

#         project['owner'] = project['api']['owner']

#         project['contributors'] = [github_user_reference(api=user_api) for user_api in api_github(project['api']['contributors_url'])]
#         project['subscribers'] = [github_user_reference(api=user_api) for user_api in api_github(project['api']['subscribers_url'])]
#         project['stargazers'] = [github_user_reference(api=user_api) for user_api in api_github(project['api']['stargazers_url'])]
        
#         project['tags'] = json_reference(api_github(project['api']['tags_url']),Asset(ASSETS,path=PATH_GITHUB_TAGS,seed=project['api']['node_id'],suffix='.json'))
#         project['releases'] = api_github(project['api']['releases_url'].replace('{/id}',''))
#         project['events'] = json_reference(api_github(project['api']['events_url']),Asset(ASSETS,path=PATH_GITHUB_EVENTS,seed=project['api']['node_id'],suffix='.json'))

#         languages = api_github(project['api']['languages_url'])
#         project['languages'] = [{'name':name,'value':languages[name]} for name in languages]

#         for key in PROJECT_VALUES:
#             if key not in project:
#                 project[key] = PROJECT_VALUES[key]
        

#         projects.append(json_reference(project,Asset(ASSETS,path=PATH_PROJECTS,seed=project['api']['node_id'],suffix='.json')))
    
#     json_save(projects,Asset(ASSETS,name='projects.json'))

# # Compiles recent events
# events = []
# events_api_url = user['api']['events_url'].replace("{/privacy}","/public")

# while len(events) < settings['event_load_count']:
#     page = int(len(events) / 100) + 1
#     events_result = api_github(events_api_url,{'per_page':100,'page':page})
#     events.extend(events_result[:min(settings['event_load_count'] - len(events),100)])

# json_save(events,Asset(ASSETS,name='events.json'))