import os, json, requests, sys
from analytics import *

REMOVE_KEYS = ['plan','two_factor_authentication','total_private_repos','owned_private_repos','private_gists','permissions']

API_TOKEN_GITHUB = None
if os.path.exists(os.path.join('.','github_token')):
    with open(os.path.join('.','github_token')) as f:
        API_TOKEN_GITHUB = f.readline()
else:
    API_TOKEN_GITHUB = os.getenv('API_GITHUB')

if not API_TOKEN_GITHUB:
    print("WARNING: NO GITHUB API TOKEN GIVEN")

def api_github_raw(url,parameters={}):
    request = requests.get(url,headers={'authorization':f'token {API_TOKEN_GITHUB}'}, params=parameters)
    if request.status_code == 403:
        print(f'API ERROR: {request["message"]}')
        sys.exit(1)
    return request

def api_github(url,parameters={}):
    print(f'API: {url} {json.dumps(parameters)}')

    analytics_ping_api_call()

    api = api_github_raw(url,parameters).json()
    if isinstance(api,dict):
        [api.pop(key,None) for key in REMOVE_KEYS]
    return api