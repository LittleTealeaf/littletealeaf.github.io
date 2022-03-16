import os, requests


api_token_github = None
if os.path.exists(os.path.join('.','github_token')):
    with open(os.path.join('.','github_token')) as f:
        api_token_github = f.readline()
else:
    api_token_github = os.getenv('API_GITHUB')

if not api_token_github:
    print("WARNING: NO GITHUB API TOKEN GIVEN")


def api_github(url,parameters={}):
    print(f'Fetching api from {url}')
    return requests.get(url,headers={'authorization':f'token {api_token_github}'}, params=parameters).json()