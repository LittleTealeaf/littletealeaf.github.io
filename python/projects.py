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
    if 'github' in project:
        github = project['github']
        repo_info = fetch_repo_information(github)
        project['github'] = repo_info



    return project


projects = [process_project(project) for project in projects]


if os.path.exists(os.path.join("src", "data", "projects.json")):
    os.remove(os.path.join("src","data","projects.json"))

with open(os.path.join("src","data","projects.json"), 'w') as file:
    file.write(json.dumps(projects))

