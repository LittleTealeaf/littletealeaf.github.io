import os, requests


api_token_github = None
if os.path.exists(os.path.join('.','github_token')):
    with open(os.path.join('.','github_token')) as f:
        api_token_github = f.readline()
else:
    api_token_github = os.getenv('API_GITHUB')


def api_github(url):
    print(f'Fetching api from {url}')
    return requests.get(url,headers={'authorization':f'token {api_token_github}'}).json()