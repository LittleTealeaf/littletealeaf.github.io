import os


# first find if the token exists
def get_github_token():
    if os.path.exists(os.path.join('.','github_token')):
        with open(os.path.join('.','github_token')) as f:
            return f.readline()
    else:
        