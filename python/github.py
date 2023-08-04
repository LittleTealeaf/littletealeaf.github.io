from bs4 import BeautifulSoup
import os
import requests
import json

if os.path.exists('.env'):
    print('Loading from .env')
    from dotenv import load_dotenv
    load_dotenv()

html = ""
with open(os.path.join('src', 'index.html')) as file:
    html = file.read()

soup = BeautifulSoup(html, features='lxml')

github_headers = {"Authorization": f"Bearer {os.getenv('API_GITHUB')}"}

request_cache = {}

def request(url):
    if url not in request_cache:
        data = requests.get(url, headers=github_headers).json()
        request_cache[repo] = data
        return data
    return request_cache[url]

icon_map = {}
with open('data/icons.json') as file:
    icon_map = json.load(file)

# Include ones needed for projects
projects = soup.select('#projects .project')
repos = {str(project['data-github']) for project in projects}


# Add any other needed here



repo_data = {}

for repo in repos:
    data = {}

    github_data = request(f'https://api.github.com/repos/{repo}')
    data['languages'] = [icon_map[lang] for lang in request(github_data['languages_url']).keys() if lang in icon_map]

    repo_data[repo] = data

with open(os.path.join('src', 'data', 'github.json'), 'w') as file:
    file.write(json.dumps(repo_data))




# project_data = {}
#
# for repo in proj_repos:
#     data = {}
#     github_data = request(f'https://api.github.com/repos/{repo}')
#     project_data[repo] = data
#
# with open(os.path.join('src','data','projects_github.json'), 'w') as file:
#     file.write(json.dumps(project_data))
#     
