import os


api_token_github = None
if os.path.exists(os.path.join('.','github_token')):
    with open(os.path.join('.','github_token')) as f:
        api_token_github = f.readline()
else:
    api_token_github = os.getenv('API_GITHUB')
