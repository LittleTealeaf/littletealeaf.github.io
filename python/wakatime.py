import requests
import os
import time

from cache_util import store_cache, get_cache

try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    ...


def getWakaApi(endpoint: str, params: dict = {}):

    key = f"WAKATIME - {endpoint}{params}"
    che = get_cache(key)
    if che != None:
        return che
    params = params.copy()
    params['api_key'] = os.getenv("WAKA_TOKEN")

    url = f"https://www.wakatime.com{endpoint}"
    response = requests.get(
        url,
        params=params,
    )
    print(endpoint)

    if response:
        data = response.json()

        store_cache(key, data)
        return data
    print(response.text)

def getStats(timeFrame: str):
    key = f"WAKATIME/STATS/{timeFrame}"
    che = get_cache(key)
    if che != None:
        return che
    params = {
        'api_key': os.getenv('WAKA_TOKEN')
    }

    stats = None
    attempts = 0
    while not stats and attempts < 10:
        attempts = attempts + 1
        print(f"Fetching stats for {timeFrame}")
        response = requests.get(f'https://www.wakatime.com/api/v1/users/current/stats/{timeFrame}',params=params)
        data = response.json()["data"]
        if data["is_up_to_date"]:
            stats = data
            break
        print(f"Waiting 60 seconds before attempting again")
        time.sleep(60)
    if stats:
        store_cache(key,stats)
    return stats
