from bs4 import BeautifulSoup
import requests
import os
import json
import shutil

if os.path.exists('.env'):
    print('Loading from dotenv')
    from dotenv import load_dotenv
    load_dotenv()


export_path = os.path.join("src", "data", "wakatime")
if os.path.exists(export_path):
    shutil.rmtree(export_path)
os.makedirs(os.path.join("src", "data"), exist_ok=True)
os.makedirs(os.path.join("src","data","wakatime"), exist_ok=True)

params = {
    'api_key': os.getenv("WAKA_TOKEN")
}

html = ""
with open(os.path.join('src', 'index.html')) as file:
    html = file.read()

soup = BeautifulSoup(html)


html_projects = {str(project['data-wakatime']) for project in soup.select('#projects [data-wakatime]')}
project_data = {}


for stats_range in ['all_time', 'last_7_days', 'last_30_days', 'last_year']:
    print(f'Getting Range {stats_range}')
    url = f'https://wakatime.com/api/v1/users/current/stats/{stats_range}'
    response = requests.get(url, params=params).json()

    if 'data' not in response:
        print(response)

    stats = response['data']

    projects = {}

    for project in stats['projects']:
        if project['name'] in html_projects:
            if project['name'] not in project_data:
                project_data[project['name']] = {}
            data = {}
            data['total_seconds'] = project['total_seconds']
            data['digital'] = project['digital']
            data['text'] = project['text']
            data['hours'] = project['hours']
            data['minutes'] = project['minutes']
            project_data[project['name']][stats_range] = data

    #
    # for project in stats['projects']:
    #     if project['name'] in html_projects:
    #         projects[project['name']] = project

    # if stats range is all time, fetch data from the 'dotfiles' to put into 'dotfiles_time.json'
    # if stats_range == 'all_time':
    #     
    #     # for project in stats['projects']:
    #     #     if project['name'] == 'dotfiles':
    #     #         data = {}
    #     #         data['hours'] = project['hours']
    #     #         data['minutes'] = project['minutes']
    #     #         with open(os.path.join('src', 'data', 'wakatime', 'dotfiles_time.json'), 'w') as file:
    #     #             file.write(json.dumps(data))

    data = {}
    data['languages'] = stats['languages']
    data['operating_systems'] = stats['operating_systems']
    data['editors'] = stats['editors']

    with open(os.path.join('src', 'data', 'wakatime', f'{stats_range}.json'), 'w') as file:
        file.write(json.dumps(data))

with open(os.path.join('src', 'data', 'wakatime', 'projects.json'), 'w') as file:
    file.write(json.dumps(project_data))
