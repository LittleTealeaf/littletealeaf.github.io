from bs4 import BeautifulSoup
import requests
import os
import json
import shutil
import time

print("Starting Script")

if os.path.exists(".env"):
    print("Loading from dotenv")
    from dotenv import load_dotenv

    load_dotenv()

export_path = os.path.join("src", "data", "wakatime")
if os.path.exists(export_path):
    shutil.rmtree(export_path)
os.makedirs(os.path.join("src", "data"), exist_ok=True)
os.makedirs(os.path.join("src", "data", "wakatime"), exist_ok=True)

params = {"api_key": os.getenv("WAKA_TOKEN")}

html = ""
with open(os.path.join("src", "index.html")) as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")


html_projects = {
    str(project["data-wakatime"])
    for project in soup.select("#projects [data-wakatime]")
}
project_data = {}


for stats_range in ["all_time", "last_7_days", "last_30_days", "last_year"]:
    print(f"Getting Range {stats_range}")
    url = f"https://wakatime.com/api/v1/users/current/stats/{stats_range}"

    stats = None
    attempts = 0

    while not stats and attempts < 10:
        print(f"Getting Request for {url}")
        response = requests.get(url, params=params)

        print(f"Recieved Request")
        json_response = response.json()

        if "data" not in json_response:
            print("Got Value:", json_response)
            quit(1)
        data = json_response["data"]

        print("Up to Date:", data["is_up_to_date"])
        print("Status:", data["status"])

        if data["is_up_to_date"] and data["status"] == "ok":
            stats = data
            break

        print("Waiting 3 minutes before attempting again")
        time.sleep(180)

    if not stats:
        print("Could not fetch data")
        quit(1)

    projects = {}

    for project in stats["projects"]:
        if project["name"] in html_projects:
            if project["name"] not in project_data:
                project_data[project["name"]] = {}
            data = {}
            data["total_seconds"] = project["total_seconds"]
            data["digital"] = project["digital"]
            data["text"] = project["text"]
            data["hours"] = project["hours"]
            data["minutes"] = project["minutes"]
            project_data[project["name"]][stats_range] = data

    data = {}
    data["languages"] = stats["languages"]
    data["operating_systems"] = stats["operating_systems"]
    data["editors"] = stats["editors"]

    with open(os.path.join("src", "data", "wakatime", f"{stats_range}.json"), "w") as f:
        f.write(json.dumps(data))

with open(os.path.join("src", "data", "wakatime", "projects.json"), "w") as f:
    f.write(json.dumps(project_data))
