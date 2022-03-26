import os
from urllib.request import Request
import requests
import sys
import time
import util_analytics as analytics
import util_images as images
import util_json as uson
from util_assets import *
from list_filetypes import *
from util_merge import *
from util_config import *



    
API_STATUS_KEY = config('github','api','keys','api_status')

TOKEN: str = None
if os.path.exists(os.path.join('.','github_token')):
    with open(os.path.join('.','github_token')) as file:
        TOKEN = file.readline();
else:
    TOKEN = os.getenv('API_GITHUB')

if not TOKEN:
    print("ERROR: NO GITHUB API TOKEN PROVIDED")
    print("Please provide a Github API key either as an environment variable API_GITHUB or within the file github_token")
    sys.exist(1)

def GET(url: str, params: dict = {}, headers: dict = {}) -> Request:
    print(f'API: {url} {params}')

    headers = headers.copy()
    headers['authorization']  = f'token {TOKEN}'
    analytics.ping_api()
    
    wait_time = config('github','api','timeout_delay')
    attempts = 3600 / wait_time
    request: requests.Response = None
    while not request and attempts > 0:
        attempts -= 1
        request = requests.get(url,headers=headers,params=params)

        if request.status_code != 200:
            print(f'API Error: {request.json()["message"]}')
            print(f'Waiting {wait_time} seconds before reattempting')
            request = None
            time.sleep(wait_time)
            if attempts > 0:
                print('Waking up, attempting API fetch again')

    if not request:
        print(f'Unable to fetch API')
        sys.exit(1)

    return request

def format_url(url: str, conf: dict = {}):
    if 'url_remove' in conf:
        for key in conf['url_remove']:
            url = url.replace(key,'')
    return url

def get_remaining_api_requests() -> int:
    return GET('https://api.github.com').headers['x-ratelimit-remaining']

def api(url: str, params: dict = {}, headers: dict = {}):
    return GET(url,params=params, headers=headers).json()

def ref_api(url: str, params: dict = {}, headers: dict = {}, asset: Asset = None):
    data = api(url,params=params, headers=headers)
    if not asset:
        asset = Asset(dir=config('github','path'),type=JSON,seed=url)
    return uson.ref(data,asset)

def api_list(url: str, params: dict = {}, headers: dict = {}, count: int = 30) -> list:
    obj = []
    page = 1
    per_page = min(100,count)
    params = params.copy()
    params['per_page'] = per_page
    while len(obj) < count:
        params['page'] = page
        api_segment = api(url,params=params,headers=headers)
        items_left = count - len(obj)
        if len(api_segment) == per_page and items_left < per_page:
            obj.extend(api_segment[:items_left])
        else:
            obj.extend(api_segment)
            if len(api_segment) < per_page:
                break
        page += 1
    return obj

def repository(url: str = None, obj: dict = None, conf: dict = {}) -> dict:
    conf = config_merge(conf,'github','repositories')

    if not url:
        url = obj['url']
    
    url = format_url(url,conf)
    
    asset = Asset(dir=conf['path'], type=JSON, seed = url)

    if asset.exists():
        cache = uson.load(asset=asset)
        obj = merge(obj,cache) if obj else cache
    else:
        analytics.ping_repo()
    
    if not obj or (conf['force_api'] and not obj[API_STATUS_KEY]):
        obj_api = api(url)
        obj = merge(obj_api,obj)
        obj[API_STATUS_KEY] = True

        if not obj:
            return None
    
    if conf['remove_keys']:
        [obj.pop(item,None) for item in conf['remove_keys']]

    if conf['contributors']['include'] and 'contributors' not in obj:
        conft = config_merge(conf['contributors'],'github','users')
        turl = format_url(obj['contributors_url'],conf['contributors'])
        items = api_list(turl,count=conft['count'])
        obj['contributors'] = uson.ref([ref_user(obj=item, conf=conft) for item in items])
    
    if conf['stargazers']['include'] and 'stargazers' not in obj:
        conft = config_merge(conf['stargazers'],'github','users')
        turl = format_url(obj['stargazers_url'],conf['stargazers'])
        items = api_list(turl,count=conft['count'])
        obj['stargazers'] = uson.ref([ref_user(obj=item, conf=conft) for item in items])
    
    if conf['subscribers']['include'] and 'subscribers' not in obj:
        conft = config_merge(conf['subscribers'],'github','users')
        turl = format_url(obj['subscribers_url'],conf['subscribers'])
        items = api_list(turl,count=conft['count'])
        obj['subscribers'] = uson.ref([ref_user(obj=item, conf=conft) for item in items])
    
    if conf['events']['include'] and 'events' not in obj:
        conft = config_merge(conf['events'],'github','events')
        turl = format_url(obj['events_url'],conft)
        items = api_list(turl,count=conft['count'])
        obj['events'] = uson.ref([ref_event(obj=item,conf=conft) for item in items])
    
    if conf['owner']['include'] and 'owner' in obj and  isinstance(obj['owner'],dict):
        obj['owner'] = ref_user(obj=obj['owner'],conf=conf['owner'])
    
    if conf['template']['include'] and 'template_repository' in obj and isinstance(obj['template_repository'],dict):
        obj['template_repository'] = ref_repository(obj=obj['template_repository'],conf=conf['template'])
    
    if conf['parent']['include'] and 'parent' in obj and isinstance(obj['parent'],dict):
        obj['parent'] = ref_repository(obj=obj['parent'],conf=conf['parent'])
    
    if conf['source']['include'] and 'source' in obj and isinstance(obj['source'],dict):
        obj['source'] = ref_repository(obj=obj['source'], conf=conf['source'])
    
    if conf['tags']['include'] and 'tags' not in obj:
        conft = config_merge(conf['tags'],'github','tags')
        turl = format_url(obj['tags_url'],conft)
        items = api_list(turl,count=conft['count'])
        obj['tags'] = uson.ref([ref_tag(item,conft) for item in items])

    if conf['languages']['include'] and 'languages' not in obj:
        conft = config_merge(conf['languages'],'github','languages')
        obj['languages'] = uson.ref(api(obj['languages_url']),dir=conft['path'])
    
    if conf['commits']['include'] and 'commits' not in obj:
        conft = config_merge(conf['commits'],'github','commits')
        turl = format_url(obj['commits_url'],conft)
        items = api_list(turl,count=conft['count'])
        obj['commits'] = uson.ref([ref_commit(obj=item,conf=conft) for item in items])

    if conf['contents']['include'] and 'contents' not in obj:
        conft = config_merge(conf['contents'],'github','contents')
        turl = format_url(obj['contents_url'],conft)
        items = api_list(turl,count=conft['count'])
        obj['contents'] = uson.ref([ref_contents(obj=item,conf=conft) for item in items])
    
    if conf['issues']['include'] and 'issues' not in obj:
        conft = config_merge(conf['issues'],'github','issues')
        turl = format_url(obj['issues_url'],conft)
        items = api_list(turl,count=conft['count'])
        obj['issues'] = uson.ref([ref_issues(obj=item, conf=conft) for item in items])
    
    if conf['forks']['include'] and 'forks' not in obj:
        conft = config_merge(conf['forks'],'github','repositories')
        turl = format_url(obj['forks_url'],conft)
        items = api_list(turl,count=conft['count'])
        obj['forks'] = uson.ref([ref_repository(obj=item,conf=conft) for item in items])
    

    return (obj,asset)
    
def ref_repository(url: str = None, obj: dict = None, conf: dict = {}):
    obj,asset=repository(url=url,obj=obj,conf=conf)
    uson.save(obj,asset=asset)
    return asset.ref

def user(username: str = None, url: str = None, obj: dict = None, conf: dict = {}):
    ...

def ref_user(username: str = None, url: str = None, obj: dict = None, conf: dict = {}):
    ...

def event(obj: dict, conf: dict = {}):
    ...

def ref_event(obj: dict, conf: dict = {}):
    ...

def tag(obj: dict, conf: dict = {}):
    ...

def ref_tag(obj: dict, conf: dict = {}):
    ...

def commit(url: str = None, obj: dict = {}, conf: dict = {}) -> tuple[dict,Asset]:
    ...

def ref_commit(url: str = None, obj: dict = {}, conf: dict = {}) -> str:
    obj,asset = commit(url=url,obj=obj,conf=conf)
    uson.save(obj,asset=asset)
    return asset.ref

def contents(url: str = None, obj: dict = {}, conf: dict = {}):
    ...

def ref_contents(url: str = None, obj: dict = {}, conf: dict = {}):
    ...

def issues(url: str = None, obj: dict = {}, conf: dict = {}):
    ...

def ref_issues(url: str = None, obj: dict = {}, conf: dict = {}):
    ...