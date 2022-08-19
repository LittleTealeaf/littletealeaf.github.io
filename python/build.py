import github
from export import *
from date_util import time_since_birthday
import wakatime
from res import *
from pathlib import Path

clear_export()

waka_all = wakatime.getStats("all_time")
waka_monthly = wakatime.getStats("last_30_days")
waka_weekly = wakatime.getStats("last_7_days")

for waka_stats in [waka_all, waka_monthly, waka_weekly]:
    for key in ['dependencies', 'is_up_to_date', 'is_stuck', 'is_up_to_date_pending_future', 'status', 'is_already_updating']:
        del waka_stats[key]
    for key in ['projects','languages','operating_systems']:
        waka_stats[key] = waka_stats[key][0:10]


def filter_keys(map, keys: list[str]):
    data = {}
    for key in keys:
        data[key] = map[key]


## ABOUT ME

export_json(
    {
        "operating systems": [
            item["name"] for item in waka_monthly["operating_systems"]
        ],
        "uptime": time_since_birthday(),
    },
    "data",
    "aboutme.json",
)


## STATS

export_json(
    {"waka": {
        "week": waka_weekly, "month": waka_monthly, "all_time": waka_all
    }}, "data", "stats.json"
)

## BACKGROUNDS

for file in os.listdir(get_res("images", "background")):

    name = Path(file).stem
    export_image(
        get_res("images", "background", file), "images", "background", f"{name}.webp"
    )

## MISC
for file in os.listdir(get_res("images", "misc")):
    name = Path(file).stem
    export_image(get_res("images", "misc", file), "images", "misc", f"{name}.webp")


# Projects
project_list = get_json_res("json", "projects.json")
for project in project_list:
    if "image" in project:
        project["image"] = export_image(
            get_res("images", "projects", project["image"]),
            "images",
            "projects",
            f'{project["name"]}.webp',
        )
export_json(project_list, "data", "projects.json")
