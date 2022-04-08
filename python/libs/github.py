import os
from libs.cachelib import Cache
import json
import requests

EXPIRES_DEFAULT_MIN = -1
EXPIRES_DEFAULT_STEP = 5
EXPIRES_DEFAULT_MAX = 168
EXPIRES_DEFAULT = 24

token: str = ''
if os.path.exists(os.path.join('.', 'github_token')):
    with open(os.path.join('.', 'github_token')) as file:
        token = file.readline()
else:
    token = os.environ['API_GITHUB']

cache = Cache('api', 'github')


def getRequest(url: str, headers: dict = {}, params: dict = {}):
    headers = headers.copy()
    headers['authorization'] = f'token {token}'
    request = requests.get(url, params=params, headers=headers)
    if request.status_code == 200:
        return request
    else:
        return None


def getAPI(url: str, headers: dict = {}, params: dict = {}, expires: int = EXPIRES_DEFAULT, expires_min: int = EXPIRES_DEFAULT_MIN, expires_max: int = EXPIRES_DEFAULT_MAX, expires_step = EXPIRES_DEFAULT_STEP):
    key = f'{url} {headers} {params}'
    cached = cache.get(key)
    if cached != None:
        print(f'CACHE: {key}')
        return cached
    print(f'API: {key}')

    request = getRequest(url, headers=headers, params=params)
    if request:
        data = request.json()
        cache.set(key, data, expires=expires,expires_min=expires_min, expires_max=expires_max, expires_step=expires_step)

        return data
    cache.set(key,None,expires=expires,expires_min=expires_min,expires_max=expires_max)
    return None


def getAPIList(url: str, headers: dict = {}, params: dict = {}, count: int = -1, expires: int=EXPIRES_DEFAULT, expires_min: int=EXPIRES_DEFAULT_MIN, expires_max: int=EXPIRES_DEFAULT_MAX, expires_step: int=EXPIRES_DEFAULT_STEP):
    data = []
    headers = headers.copy()
    params = params.copy()
    params['per_page'] = 100
    params['page'] = 1
    while count == -1 or len(data) < count:
        fetched: list = getAPI(url, headers, params, expires=expires, expires_min=expires_min,expires_max=expires_max,expires_step=expires_step)
        if fetched == None:
            return data
        length = len(fetched)
        while len(fetched) > 0 and (len(data) < count or count == -1):
            data.append(fetched.pop(0))
        if length < params['per_page']:
            break
        params['page'] = params['page'] + 1
    return data


def getAnalytics():
    return {
        'cache': cache.analytics()
    }
