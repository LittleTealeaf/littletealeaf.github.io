import os

import requests

from cache import get_cache,store_cache

try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    ...

github_token = os.environ.get("API_GITHUB")


def getGithubApi(url: str, headers: dict = {}, params: dict = {}):

    cache = get_cache(url + str(headers) + str(params))

    if cache != None:
        return cache


    headers = headers.copy()
    if github_token != None:
        headers['authorization'] = f'token {github_token}'
    request = requests.get(url, params=params, headers=headers)
    if request.status_code == 200:
        store_cache(url + str(headers) + str(params),request.json())
        return request.json()
    else:
        return None


