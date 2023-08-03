import shutil
import requests
import os
import json

if os.path.exists(".env"):
    from dotenv import load_dotenv
    load_dotenv()


projects = []
with open('data/projects.json') as file:
    projects = json.load(file)

icons = {}
with open('data/icons.json') as file:
    icons = json.load(file)

def fetch_repo_information(github):
    headers = {"Authorization": f"Bearer {os.getenv('API_GITHUB')}"}
    ghdata = requests.get(f'https://api.github.com/repos/{github}', headers=headers).json()
    data = {}
    data['name'] = ghdata['full_name']
    data['url'] = ghdata['html_url']
    data['languages'] = requests.get(ghdata['languages_url'], headers=headers).json()
    data['stars'] = ghdata['stargazers_count']
    data['watchers'] = ghdata['watchers_count']
    data['topics'] = ghdata['topics']
    data['archived'] = ghdata['archived']
    return data


def process_project(project):
    proj = {
        'name': project['name'],
        'description': project['description'],
        'links': [
        ],
        'icons': [],
        'archive': project['archive']
    }

    if 'website' in project:
        proj['links'].append({
            'icon': 'nf-md-web',
            'label': 'Website',
            'url':project['website']
        })

    if 'github' in project:
        github = fetch_repo_information(project['github'])
        proj['links'].append({
            'icon': 'nf-dev-github',
            'label': 'GitHub',
            'url': github['url']
        })
        proj['debug'] = github

        for lang in github['languages']:
            if lang in icons:
                proj['icons'].append(icons[lang])

    return proj



#     return project


projects = [process_project(project) for project in projects]


if os.path.exists(os.path.join("src", "data", "projects.json")):
    os.remove(os.path.join("src","data","projects.json"))

with open(os.path.join("src","data","projects.json"), 'w') as file:
    file.write(json.dumps(projects))
