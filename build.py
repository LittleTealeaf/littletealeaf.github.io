import json
import os
from pathlib import Path
import python.cache as cache
import python.wakatime as wakatime
import python.github as github
from python.export import export_image, export_json, export_online_image, reset_export

reset_export()

file = open("./config.json")
CONFIG = json.load(file)
file.close()

for img_list in CONFIG["images"]:
    source: str = img_list["source"]
    destination: list[str] = img_list["destination"]
    for file in os.listdir(source):
        path = Path(file)
        fileName = "/".join([source, file])
        export_image(destination + [path.stem + ".webp"], fileName)


data = {}
for file in os.listdir('./resources/data'):
    path = Path(file)
    with open(f'./resources/data/{file}') as file:
        data[path.stem] = json.load(file)

waka_all = wakatime.get_stats("all_time")
waka_monthly = wakatime.get_stats("last_30_days")
waka_weekly = wakatime.get_stats("last_7_days")


github_api = github.getGithubApi("/users/LittleTealeaf")

export_online_image(['images','avatar.webp'],github_api['avatar_url'])


def add_project_links(projects):
    for project in projects:
        waka_api = wakatime.getWakaApi(
            f"/api/v1/users/LittleTealeaf/projects/{project['name']}"
        )
        if (
            waka_api
            and "data" in waka_api
            and "repository" in waka_api["data"]
            and waka_api["data"]["repository"] != None
        ):
            project["url"] = waka_api["data"]["repository"]["html_url"]
    return projects


def build_stats(data):
    return {
        "projects": add_project_links(data["projects"][0:10]),
        "operating_systems": data["operating_systems"][0:10],
        "languages": data["languages"][0:10],
        "editors": data["editors"][0:10],
        "categories": data["categories"][0:10],
        "daily_average": data["human_readable_daily_average"],
        "total_time": data["human_readable_total"],
    }


export_json(
    ["data", "stats"],
    {
        "waka": {
            "Past 7 Days": build_stats(waka_weekly),
            "Past 30 Days": build_stats(waka_monthly),
            "All Time": build_stats(waka_all),
        }
    },
)

export_json(
    ["data","about"],
    data["aboutme"]
)
