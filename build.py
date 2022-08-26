import python.cache as cache
import python.wakatime as wakatime
import python.github as github
from python.export import export_json, reset_export

reset_export()


waka_all = wakatime.get_stats("all_time")
waka_monthly = wakatime.get_stats("last_30_days")
waka_weekly = wakatime.get_stats("last_7_days")


export_json(["data","stats"],{
    'test': 'hello world'
})
export_json(["data","oij"],{
    'test': 'hello world'
})
