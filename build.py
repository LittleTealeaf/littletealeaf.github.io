import json
from pathlib import Path
import python.cache as cache
import python.wakatime as wakatime
import python.github as github
from python.export import export_image, export_json, reset_export

reset_export()

file = open('./config.json')
CONFIG = json.load(file)
file.close()

waka_all = wakatime.get_stats("all_time")
waka_monthly = wakatime.get_stats("last_30_days")
waka_weekly = wakatime.get_stats("last_7_days")


def add_project_links(projects):
    for project in projects:
        waka_api = wakatime.getWakaApi(f"/api/v1/users/LittleTealeaf/projects/{project['name']}")
        if waka_api and 'data' in waka_api and 'repository' in waka_api['data'] and waka_api['data']['repository'] != None:
            project['url'] = waka_api['data']['repository']['html_url']
    return projects

def build_stats(data):
    return {
        'projects': add_project_links(data['projects'][0:10]),
        'operating_systems': data['operating_systems'][0:10],
        'languages': data['languages'][0:10],
        'editors': data['editors'][0:10],
        'daily_average': data['human_readable_daily_average'],
        'total_time': data['human_readable_total']
    }

export_json(['data','stats'],{
    'waka': {
        'week': build_stats(waka_weekly),
        'month': build_stats(waka_monthly),
        'all': build_stats(waka_all)
    }
})


for file in CONFIG['backgrounds']:
    export_image(['images','background',f'{Path(file).stem}.webp'],file)
