import os
import requests
import sys
import util_analytics as analytics
import util_images as images
import util_json as json
from util_assets import Asset
from list_filetypes import *
from util_config import CONFIG

DIR = ['github']
DIR_USER = DIR + ['user']
DIR_EVENT = DIR + ['event']
DIR_REPO = DIR + ['repo']

REMOVE_KEYS = ['plan', 'two_factor_authentication', 'total_private_repos',
               'owned_private_repos', 'private_gists', 'permissions']
REMOVE_USER = ['contributions']
TOKEN = None
if os.path.exists(os.path.join('.', 'github_token')):
    with open(os.path.join('.', 'github_token')) as f:
        TOKEN = f.readline()
else:
    TOKEN = os.getenv('API_GITHUB')

if not TOKEN:
    print("ERROR: NO GITHUB API TOKEN PROVIDED")
    sys.exit(1)


def GET(url: str, parameters: dict = {}, headers: dict = {}):
    headers = headers.copy()
    headers.update({
        'authorization': f'token {TOKEN}'
    })
    analytics.ping_api()
    request = requests.get(url, headers=headers, params=parameters)
    if request.status_code == 403:
        print(f'API ERROR: {request.json()["message"]}')
        sys.exit(1)
    return request


def api(url: str, parameters: dict = {}):
    result = GET(url, parameters=parameters).json()
    if isinstance(result, dict):
        [result.pop(key, None) for key in REMOVE_KEYS]
    return result


def api_list(url: str, parameters: dict = {}, count=30):
    obj = []
    page = 1
    per_page = min(100, count)
    params = {}
    params.update(parameters)
    params['per_page'] = per_page
    while len(obj) < count:
        params['page'] = page
        api_segment = api(url, params)
        items_left = count - len(obj)
        if len(api_segment) == per_page and items_left < per_page:
            obj.extend(api_segment[:items_left])
        else:
            obj.extend(api_segment)
            if len(api_segment) < per_page:
                break
        page = page + 1
    return obj


def api_ref(url, parameters={}, asset=None):

    data = api(url, parameters)
    if not asset:
        asset = Asset(dir=DIR, type=JSON, seed=url)

    return json.ref(data, asset)


def ref_user(username: str = None, url: str = None, obj: dict = None, update: bool = False, followers: bool = False, following: bool = False):

    key_followers = 'followers_list'
    key_following = 'following_list'

    if not url:
        if username:
            url = f'https://api.github.com/users/{username}'
        elif obj:
            url = obj['url']

    asset = Asset(dir=DIR_USER, seed=url, type=JSON)

    if asset.exists():
        cache = json.load(asset=asset)
        if obj:
            cache.update(obj)
        obj = cache

    if not obj:
        obj = api(url)
    elif update:
        obj.update(api(url))

    if 'avatar' not in obj:
        obj['avatar'] = images.ref(obj['avatar_url'], circular=True)
    
    if followers and key_followers not in obj:
        obj[key_followers] = ref_user_list(obj['followers_url'],count=CONFIG['load_count']['followers'])
    
    if following and key_following not in obj:
        obj[key_following] = ref_user_list(obj['following_url'].replace('{/other_user}',''),count=CONFIG['load_count']['followers'])

    [obj.pop(key,None) for key in REMOVE_USER]

    return json.ref(obj, asset)


def ref_user_list(url: str, count: int = CONFIG['load_count']['users']):
    return json.ref([ref_user(obj=i) for i in api_list(url,count=count)])


def ref_repository(url: str=None, obj: dict=None, force_api: bool=True, get_events: bool = False, get_stargazers: bool = False, get_contributors: bool = False, get_subscribers: bool = False):

    if not url:
        url = obj['url']

    asset = Asset(dir=DIR_REPO,type=JSON,seed=(url if url else obj['url']))

    if asset.exists():
        cache = json.load(asset=asset)
        if obj:
            cache.update(obj)
        obj = cache
    
    if not obj:
        obj = api(url)
    elif force_api:
        obj.update(api(url))

    if isinstance(obj['owner'],dict):
        obj['owner'] = ref_user(obj=obj['owner'])
    
    if 'languages' not in obj:
        languages = api(obj['languages_url'])
        obj['languages'] = json.ref([{'name':key,'value':languages[key]} for key in languages])
    

    if get_subscribers and 'subscribers' not in obj:
        obj['subscribers'] = ref_user_list(obj['subscribers_url'],count=CONFIG['load_count']['subscribers'])
    
    if get_stargazers and 'stargazers' not in obj:
        obj['stargazers'] = ref_user_list(obj['stargazers_url'],count=CONFIG['load_count']['subscribers'])

    if get_events and 'events' not in obj:
        obj['events'] = ref_event_list(obj['events_url'],load_repo=False)
    
    if get_contributors and 'contributors' not in obj:
        contributors = []
        for contributor in api_list(obj['contributors_url'], count=CONFIG['load_count']['contributors']):
            if '[bot]' not in contributor['login'] or CONFIG['github']['contributors']['include_bots']:
                contributors.append(contributor)
        obj['contributors'] = json.ref([{'contributions': i['contributions'],'user':ref_user(obj=i)} for i in contributors])
    
    return json.ref(obj,asset=asset)

        
    

def ref_event(obj: dict,load_repo: bool=False):
    asset = Asset(dir=DIR_EVENT,type=JSON,seed=obj['id'])
    if not asset.exists():
        if 'repo' in obj:
            if load_repo:
                obj['repo'] = ref_repository(obj=obj['repo'])
            else:
                repo_asset = Asset(dir=DIR_REPO,seed=obj['repo']['url'],type=JSON)
                if repo_asset.exists():
                    obj['repo'] = repo_asset.ref
                else:
                    obj['repo'] = json.ref(obj['repo'],asset=repo_asset)
        if 'actor' in obj:
            obj['actor'] = ref_user(url=obj['actor']['url'])
        json.save(obj,asset=asset)
    return asset.ref
                


def ref_event_list(url,count: int=CONFIG['load_count']['events'], load_repo: bool=True):
    return json.ref([ref_event(i,load_repo=load_repo) for i in api_list(url,count=count)])
