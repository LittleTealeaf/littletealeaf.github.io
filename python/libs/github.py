import os
from libs.cachelib import Cache
import json
import requests


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


def getAPI(url: str, headers: dict = {}, params: dict = {}):
    key = f'{url} {headers} {params}'
    cached = cache.get(key)
    if cached != None:
        print(f'CACHE: {key}')
        return cached
    print(f'API: {key}')

    request = getRequest(url, headers=headers, params=params)
    if request:
        data = request.json()
        cache.set(key, data)

        return data

    return None


def getAPIList(url: str, headers: dict = {}, params: dict = {}, count: int = -1):
    data = []
    headers = headers.copy()
    params = params.copy()
    params['per_page'] = 100
    params['page'] = 1
    while count == -1 or len(data) < count:
        fetched: list = getAPI(url, headers, params)
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
