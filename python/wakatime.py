import requests
import os
import json
import shutil
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

# EMBEDDABLE JSONS
all_time_stats = requests.get(
    "https://wakatime.com/api/v1/users/current/stats/all_time", params=params
).json()

for project in all_time_stats['data']['projects']:
    if project['name'] == 'dotfiles':
        dotfiles_data = {
            'hours': project['hours'],
            'minutes': project['minutes'],
        }
        with open(os.path.join("src", "data", "wakatime", "dotfiles_time.json"), 'w') as file:
            file.write(json.dumps(dotfiles_data))


# 
