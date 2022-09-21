from datetime import datetime
import json
import os
from pathlib import Path
import python.cache as cache
from python.pages import *
import python.wakatime as wakatime
import python.github as github
from python.export import export_image, export_json, export_online_image, reset_export
from dateutil.relativedelta import relativedelta

HIDDEN_PROJECTS = ["No Project", "Unknown Project"]
HIDDEN_LANGUAGES = ["Other"]

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


# data = {}
# for file in os.listdir("./resources/data"):
#     path = Path(file)
#     with open(f"./resources/data/{file}") as file:
#         data[path.stem] = json.load(file)

waka_all = wakatime.get_stats("all_time")
waka_monthly = wakatime.get_stats("last_30_days")
waka_weekly = wakatime.get_stats("last_7_days")


github_api = github.getGithubApi("/users/LittleTealeaf")

export_online_image(["images", "avatar.webp"], github_api["avatar_url"])


def format_projects(projects):

    # filter out hidden projects
    projects = [
        project for project in projects if project["name"] not in HIDDEN_PROJECTS
    ]

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

def format_languages(languages):
    return [language for language in languages if language['name'] not in HIDDEN_LANGUAGES]


def build_stats(data):
    return {
        "projects": format_projects(data["projects"])[0:10],
        "operating_systems": data["operating_systems"][0:10],
        "languages": format_languages(data["languages"])[0:10],
        "editors": data["editors"][0:10],
        "categories": data["categories"][0:10],
        "daily_average": data["human_readable_daily_average"],
        "total_time": data["human_readable_total"],
    }

export_tree([
    page('About Me',[
        {
            'type': 'text',
            'content': 'HI, THIS IS ABOUT ME'
        }
    ]),
    # page('Stats',{
    #     "waka": {
    #         "Past 7 Days": build_stats(waka_weekly),
    #         "Past 30 Days": build_stats(waka_monthly),
    #         "All time": build_stats(waka_all)
    #     }
    # },renderer='stats')
    folder('Stats',[
        page('Past 7 days',build_stats(waka_weekly),'stats'),
        page('Past 30 days',build_stats(waka_weekly),'stats'),
        page('All time',build_stats(waka_all),'stats')
    ])
])

# pages.export_tree({
#     # 'stats': pages.page({

#     # })
# })

# export_json(
#     ["data", "stats"],
#     {
#         "waka": {
#             "Past 7 Days": build_stats(waka_weekly),
#             "Past 30 Days": build_stats(waka_monthly),
#             "All Time": build_stats(waka_all),
#         }
#     },
# )

# data["aboutme"]["level"] = (
#     relativedelta(datetime(2002, 5, 28), datetime.today()).years * -1
# )
# classes = data["aboutme"]["classes"]
# data["aboutme"]["classes"] = []
# for name in classes:
#     data["aboutme"]["classes"].append(
#         f'{name} {round(data["aboutme"]["level"] * classes[name])}'
#     )

# export_json(["data", "about"], data["aboutme"])
