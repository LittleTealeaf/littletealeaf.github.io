import requests
import os
import shutil


export_path = os.path.join("src", "data", "wakatime")
if os.path.exists(export_path):
    shutil.rmtree(export_path)



# EMBEDDABLE JSONS
response = requests.get("https://wakatime.com/share/@LittleTealeaf/a74583c7-30a4-4922-95e0-08c97a8d79cb.json")
year_activity = response.json()
assert 'days' in year_activity
year_activity = year_activity['days']

