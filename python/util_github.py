import os
from urllib.request import Request
import requests
import sys
import time
import util_analytics as analytics
import util_images as images
import util_json as json
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

def get_remaining_api_requests() -> int:
    return GET('https://api.github.com').headers['x-ratelimit-remaining']

def api(url: str, params: dict = {}, headers: dict = {}):
    return GET(url,params=params, headers=headers).json()

def ref_api(url: str, params: dict = {}, headers: dict = {}, asset: Asset = None):
    data = api(url,params=params, headers=headers)
    if not asset:
        asset = Asset(dir=config('github','path'),type=JSON,seed=url)
    return json.ref(data,asset)

def repository(url: str = None, obj: dict = None, conf: dict = {}) -> dict:
    conf = config_merge(conf,'github','repositories')

    if not url:
        url = obj['url']
    
    asset = Asset(dir=conf['path'], type=JSON, seed = url)

    if asset.exists():
        cache = json.load(asset=asset)
        obj = merge(obj,cache) if obj else cache
    else:
        analytics.ping_repo()
    
    if not obj or (conf['force_api'] and not obj[API_STATUS_KEY]):
        obj_api = api(url)
        obj = merge(obj_api,obj)
        obj[API_STATUS_KEY] = True

        if not obj:
            return None

