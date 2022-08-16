from github import *
from export import *
from date_util import time_since_birthday
from wakatime import *
from res import *
from pathlib import Path

clear_export()

waka_all = getWakaData("/api/v1/users/LittleTealeaf/stats/all_time")["data"]
waka_monthly = getWakaData("/api/v1/users/LittleTealeaf/stats/last_30_days")["data"]
waka_weekly =  getWakaData("/api/v1/users/LittleTealeaf/stats/last_7_days")["data"]


## ABOUT ME

export_json({
    'operating systems': [item['name'] for item in waka_monthly['operating_systems']],
    'uptime': time_since_birthday()
},'data','aboutme.json')


## STATS

export_json({
    
},'data','stats.json')

## BACKGROUNDS

for file in os.listdir(get_res('images','background')):

    name = Path(file).stem
    export_image(get_res('images','background',file),'images','background',f'{name}.webp')

## IMPORTS
for file in os.listdir(get_res('images','misc')):
    name = Path(file).stem
    export_image(get_res('images','misc',file),'images','misc',f'{name}.webp')


# Projects
project_list = get_json_res('json','projects.json')
for project in project_list:
    if 'image' in project:
        project['image'] = export_image(get_res('images','projects',project['image']),'images','projects',f'{project["name"]}.webp')
export_json(project_list,'data','projects.json')
