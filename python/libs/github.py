import os
from libs.cache import Cache
import json
import requests

# EXPIRES_DEFAULT_MIN = 1
# EXPIRES_DEFAULT_STEP = 5
# EXPIRES_DEFAULT_MAX = 168
# EXPIRES_DEFAULT = 24

token: str = ''
if os.path.exists(os.path.join('.', 'github_token')):
    with open(os.path.join('.', 'github_token')) as file:
        token = file.readline().partition('\n')[0]
else:
    token = os.environ['API_GITHUB']

cache = Cache('api')


def getRequest(url: str, headers: dict = {}, params: dict = {}):
    headers = headers.copy()
    headers['authorization'] = f'token {token}'
    request = requests.get(url, params=params, headers=headers)
    if request.status_code == 200:
        return request
    else:
        return None


def getAPI(url: str, headers: dict = {}, params: dict = {}, use_cache: bool = True):
    key = f'{headers}{params}'
    if use_cache:
        cached = cache.get(key,source=url)
        if cached != None:
            print(f'CACHE: {url} {key}')
            return cached
    print(f'API: {url} {key}')

    request = getRequest(url, headers=headers, params=params)
    if request:
        data = request.json()
        if use_cache:
            cache.set(key, data,source=url)

        return data
    if use_cache:
         cache.set(key,None,source=url)
    return None


def getAPIList(url: str, headers: dict = {}, params: dict = {}, count: int = -1, use_cache: bool = True):
    data = []
    headers = headers.copy()
    params = params.copy()
    params['per_page'] = 100
    params['page'] = 1
    while count == -1 or len(data) < count:
        fetched: list = getAPI(url, headers, params,use_cache=use_cache)
        if fetched == None:
            return data
        length = len(fetched)
        while len(fetched) > 0 and (len(data) < count or count == -1):
            data.append(fetched.pop(0))
        if length < params['per_page']:
            break
        params['page'] = params['page'] + 1
    return data

def renderMarkdown(text, context: str =  None):
    return requests.post('https://api.github.com/markdown',json={
        'mode': 'markdown',
        'text': text,
        'context': context
    },headers={
        'authorization': f'token {token}'
    }).text


def getAnalytics():
    return {
        'cache': cache.analytics()
    }
