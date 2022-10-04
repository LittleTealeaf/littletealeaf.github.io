from libs import *
from libs import wakatime


def format_stats(stats):

    return {
      "categories": stats["categories"],
      "editors": stats["editors"],
      "languages": stats["languages"],
      "operating_systems": stats["operating_systems"],
      "projects": stats["projects"],
    }, {}


def build():

    last_7_days, last_7_days_references = format_stats(
        wakatime.get_stats("last_7_days")
    )
    last_30_days, last_30_days_references = format_stats(
        wakatime.get_stats("last_30_days")
    )
    all_time, all_time_reference = format_stats(wakatime.get_stats("all_time"))

    references = {}

    return page(
        "Stats",
        {
            "references": references,
            "stats": {
                "Last Week": last_7_days,
                "Last 30 Days": last_30_days,
                "All Time": all_time,
            },
        },
        render="stats",
        id="stats",
    )
