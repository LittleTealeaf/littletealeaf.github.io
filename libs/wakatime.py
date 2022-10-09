import requests
import os
import time

from libs.cache import store_cache, get_cache

try:
    from dotenv import load_dotenv

    load_dotenv()
except:
    ...

CACHE_KEY = "wakatime"


def getWakaApi(endpoint: str, params: dict = {}):

    key = f"{endpoint}{params}"
    che = get_cache(CACHE_KEY, key)
    if che != None:
        return che
    params = params.copy()
    params["api_key"] = os.getenv("WAKA_TOKEN")

    url = f"https://www.wakatime.com{endpoint}"
    response = requests.get(url, params=params,)
    print(endpoint)

    if response:
        data = response.json()

        store_cache(CACHE_KEY, key, data)
        return data
    print(response.text)


def get_stats(timeFrame: str):
    key = f"STATS/{timeFrame}"
    params = {"api_key": os.getenv("WAKA_TOKEN")}

    stats = None
    attempts = 0
    while not stats and attempts < 5:
        attempts = attempts + 1
        print(f"Fetching stats for {timeFrame}")
        response = requests.get(
            f"https://www.wakatime.com/api/v1/users/current/stats/{timeFrame}",
            params=params,
        )
        data = response.json()["data"]
        if data["is_up_to_date"] and data["status"] == "ok":
            stats = data
            break
        print(f"Waiting 3 minutes before attempting again")
        time.sleep(180)

    if stats:
        store_cache('wakatime',key,stats,no_delete=True)
    else:
        stats = get_cache('wakatime',key,no_delete=True)

    return stats


# def format_projects(projects):

#     # filter out hidden projects
#     projects = [
#         project for project in projects if project["name"] not in HIDDEN_PROJECTS
#     ]

#     for project in projects:
#         waka_api = wakatime.getWakaApi(
#             f"/api/v1/users/LittleTealeaf/projects/{project['name']}"
#         )
#         if (
#             waka_api
#             and "data" in waka_api
#             and "repository" in waka_api["data"]
#             and waka_api["data"]["repository"] != None
#         ):
#             project["url"] = waka_api["data"]["repository"]["html_url"]

#     return projects

def get_project_api(project):
    waka_api = getWakaApi(
        f"/api/v1/users/LittleTealeaf/projects/{project['name']}"
    )
    if (
        waka_api
        and "data" in waka_api
        and "repository" in waka_api["data"]
        and waka_api["data"]["repository"] != None
    ):
        project["url"] = waka_api["data"]["repository"]["html_url"]

    return project
