import os

import requests

try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    ...

github_token = os.environ.get("API_GITHUB")


def getRequest(url: str, headers: dict = {}, params: dict = {}):
    headers = headers.copy()
    if github_token != None:
        headers['authorization'] = f'token {github_token}'
    request = requests.get(url, params=params, headers=headers)
    if request.status_code == 200:
        return request
    else:
        return None
