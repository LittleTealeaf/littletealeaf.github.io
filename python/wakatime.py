import requests
import os
import json
import shutil

if os.path.exists('.env'):
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

for stats_range in ['all_time', 'last_7_days', 'last_30_days', 'last_year']:
    print(f'Getting Range {stats_range}')
    url = f'https://wakatime.com/api/v1/users/current/stats/{stats_range}'
    response = requests.get(url, params=params).json()

    if 'data' not in response:
        print(response)

    stats = response['data']

    # if stats range is all time, fetch data from the 'dotfiles' to put into 'dotfiles_time.json'
    if stats_range == 'all_time':
        for project in stats['projects']:
            if project['name'] == 'dotfiles':
                data = {}
                data['hours'] = project['hours']
                data['minutes'] = project['minutes']
                with open(os.path.join('src', 'data', 'wakatime', 'dotfiles_time.json'), 'w') as file:
                    file.write(json.dumps(data))

    data = {}
    data['languages'] = stats['languages']
    data['operating_systems'] = stats['operating_systems']
    data['editors'] = stats['editors']

    with open(os.path.join('src', 'data', 'wakatime', f'{stats_range}.json'), 'w') as file:
        file.write(json.dumps(data))
