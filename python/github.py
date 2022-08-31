import os

import requests

from python.cache import get_cache,store_cache

try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    ...

github_token = os.environ.get("API_GITHUB")


def getGithubApi(endpoint: str, headers: dict = {}, params: dict = {}):
    url = f'https://api.github.com{endpoint}'
    key = f'{url}{headers}{params}'

    cache = get_cache('github',key)

    if cache != None:
        return cache


    headers = headers.copy()
    if github_token != None:
        headers['authorization'] = f'token {github_token}'
    request = requests.get(url, params=params, headers=headers)
    if request.status_code == 200:
        store_cache('github',key,request.json())
        return request.json()
    return None
