from datetime import datetime
import json
import os
from pathlib import Path
import libs.cache as cache
from libs.pages import *
import libs.wakatime as wakatime
import libs.github as github
from libs.export import export_image, export_json, export_online_image, reset_export
from dateutil.relativedelta import relativedelta

HIDDEN_PROJECTS = ["No Project", "Unknown Project"]
HIDDEN_LANGUAGES = ["Other"]

reset_export()

file = open("./config.json")
CONFIG = json.load(file)
file.close()


waka_all = wakatime.get_stats("all_time")
waka_monthly = wakatime.get_stats("last_30_days")
waka_weekly = wakatime.get_stats("last_7_days")


github_api = github.getGithubApi("/users/LittleTealeaf")

github_avatar = export_online_image(github_api["avatar_url"])


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
    return [
        language for language in languages if language["name"] not in HIDDEN_LANGUAGES
    ]


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


# reads a json file and returns the data
def read_json(file):
    with open(file, "r") as f:
        return json.load(f)


# Import projects from ./resources/projects/*.json and compile them to a projects list
projects = []
for file in os.listdir("./resources/projects"):
    data = read_json(f"./resources/projects/{file}")
    if "links" not in data:
        data["links"] = {}
    if "github" in data:
        # data["github_api"] = github.getGithubApi(f"/repos/{data['github']}")
        github_api = github.getGithubApi(f"/repos/{data['github']}")
        if github_api:
            data["links"]["github"] = github_api["html_url"]
        # populate the 'last updated' field with a formatted timestamp
        if "updated_at" in github_api:
            data["updated_at"] = datetime.strptime(
                github_api["updated_at"], "%Y-%m-%dT%H:%M:%SZ"
            ).strftime("%d %B %Y")

        try:
            if "wakatime" in data:
                waka_api = wakatime.getWakaApi(
                    f"/api/v1/users/LittleTealeaf/projects/{data['wakatime']}"
                )

                past_30_days = wakatime.getWakaApi(
                    "/api/v1/users/LittleTealeaf/summaries?range=last_30_days&project="
                    + data["wakatime"]
                )["data"]
                past_30_days = [
                    day for day in past_30_days if day["grand_total"]["total_seconds"] > 0
                ]
        except:
            ...

    if "images" in data:
        data["images"] = [
            export_online_image(image)
            if image.startswith("http")
            else export_local_image(image)
            for image in data["images"]
        ]

    projects.append(data)


RESUME = read_json("./resources/resume.json")


ABOUT_ME = {
    "tag": "div",
    "classList": ["__about-me"],
    "children": [
        {
            "tag": "div",
            "classList": ["__header"],
            "children": [
                {"tag": "img", "src": github_avatar, "alt": "avatar",},
                {"tag": "h1", "text": "Hi! I'm Thomas Kwashnak"},
                {
                    "tag": "h2",
                    "text": "I'm a Computer Science and Data Science double major at Quinnipiac University.",
                },
            ],
        }
    ],
}


export_tree(
    [
        page("About Me", ABOUT_ME, "dom"),
        folder(
            "Stats",
            [
                page("Past 7 days", build_stats(waka_weekly), "stats"),
                page("Past 30 days", build_stats(waka_weekly), "stats"),
                page("All time", build_stats(waka_all), "stats"),
            ],
        ),
        folder(
            "Projects",
            [page(project["name"], project, "project") for project in projects],
        ),
        page("Resume", RESUME, "resume"),
        page("Contacts",{},"dom")
    ]
)
