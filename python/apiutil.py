import os, json, requests

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
    return requests.get(url,headers={'authorization':f'token {API_TOKEN_GITHUB}'}, params=parameters)

def api_github(url,parameters={}):
    print(f'API: {url} {json.dumps(parameters)}')

    data = {'count':0}
    if os.path.exists('tmp.json'):
        with open('tmp.json') as file:
            data = json.load(file)
    data['count'] = data['count'] + 1
    with open('tmp.json','w') as file:
        file.write(json.dumps(data))

    api = api_github_raw(url,parameters).json()
    if isinstance(api,dict):
        [api.pop(key,None) for key in REMOVE_KEYS]
    return api