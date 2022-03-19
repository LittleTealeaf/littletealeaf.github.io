import os, requests, json
from assetutil import *
from imageutil import *
from jsonutil import *
from apiutil import *


GITHUB = ['github']
GITHUB_USER = GITHUB + ['users']
GITHUB_EVENT = GITHUB + ['events']
GITHUB_REPO = GITHUB + ['repo']
GITHUB_README = GITHUB + ['readme']

CONFIG = load_json(get_asset_path('pyconfig.json'))


def api_github_list(url,parameters={}, count=30):
    api = []
    page = 1
    size = min(100,count - len(api))
    params = {'per_page':size}
    params.update(parameters)
    while len(api) < count:
        params['page'] = page
        api_segment = api_github(url,params)
        count_left = count - len(api)
        if len(api_segment) == size and count_left < size:
            api.extend(api_segment[:count_left])
        else:
            api.extend(api_segment)
            if len(api_segment) < size:
                break;
        page = page + 1
    return api

def ref_github_api(url,parameters={},asset=None):
    api = api_github(url,parameters)
    if not asset:
        asset = Asset(GITHUB,type=JSON,seed=(url + json.dumps(parameters)))
    
    return ref_json(api,asset)

def ref_github_user(username=None,url=None,api=None,update=False,followers=False,following=False):

    key_followers = 'followers_list'
    key_following = 'following_list'

    if not url:
        if username:
            url = f'https://api.github.com/users/{username}'
        elif api:
            url = api['url']
    
    asset = Asset(path=GITHUB_USER,seed=url,type=JSON)

    if asset.exists() and not update:
        api_cache = json_asset(asset)

        update = followers and key_followers not in api_cache
        update = update and following and key_following not in api_cache

        if not update:
            return asset.ref
        
        if api:
            api_cache.update(api)
            api = api_cache
            
                
    if not api:
        api = api_github(url)
    
    if 'avatar' not in api:
        api['avatar'] = ref_image(api['avatar_url'],circular=True)

    if followers and key_followers not in api:
        api[key_followers] = ref_github_user_list(api['followers_url'],CONFIG['load_count']['followers'])
    
    if following and key_following not in api:
        api[key_following] = ref_github_user_list(api['following_url'].replace('{/other_user}',''),CONFIG['load_count']['following'])
    
    return ref_json(api,asset)

def ref_github_user_list(url,load_count):
    api_list = api_github_list(url,count=load_count)
    return ref_json([ref_github_user(api=i) for i in api_list])

def ref_github_event(api,load_repo=True):
    asset = Asset(GITHUB_EVENT,seed=api['id'],type=JSON)
    if not asset.exists():
        if 'repo' in api:
            if load_repo:
                api['repo'] = ref_github_repository(api['repo']['url'])
            else:
                api['repo'] = Asset(path=GITHUB_REPO,seed=api['repo']['url'],type=JSON).ref
        
        if 'actor' in api:
            api['actor'] = ref_github_user(url=api['actor']['url'])

        save_json(api,asset)
    return asset.ref

def ref_github_event_list(url,load_count,load_repo=True):
    api = [ref_github_event(i,load_repo=load_repo) for i in api_github_list(url,count=load_count)]
    return ref_json(api)

def ref_github_repository(url,get_events=False,get_stargazers=False,get_contributors=False, get_subscribers=False):
    asset = Asset(path=GITHUB_REPO,seed=url,type=JSON)

    if not asset.exists():
        api = api_github(url)        
    else:
        api = load_json(asset.path)
    
    if isinstance(api['owner'],dict):
        api['owner'] = ref_github_user(api=api['owner'])

    if 'languages' not in api:
        api_languages = api_github(api['languages_url'])
        languages = [{'name':key,'value':api_languages[key]} for key in api_languages]
        api['languages'] = ref_json(languages)
    
    if get_subscribers and 'subscribers' not in api:
        api['subscribers'] = ref_github_user_list(api['subscribers_url'],CONFIG['load_count']['subscribers'])
    if get_stargazers and 'stargazers' not in api:
        api['stargazers'] = ref_github_user_list(api['stargazers_url'],CONFIG['load_count']['stargazers'])
    if get_events and 'events' not in api:
        api['events'] = ref_github_event_list(api['events_url'],CONFIG['load_count']['events'],load_repo=False)
    
    if get_contributors and 'contributors' not in api:
        contributors = []
        for contributor in api_github_list(api['contributors_url'],count=CONFIG['load_count']['contributors']):
            if '[bot]' not in contributor['login'] or CONFIG['github']['contributors']['include_bots']:
                contributors.append(contributor)
        api['contributors'] = ref_json([{'user':ref_github_user(api=i),'contributions':i['contributions']} for i in contributors])
        

    save_json(api,asset)
    return asset.ref
