import requests
import os
import time

from python.cache import store_cache, get_cache

try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    ...


def getWakaApi(endpoint: str, params: dict = {}):

    key = f"{endpoint}{params}"
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

        store_cache('wakatime',key, data)
        return data
    print(response.text)

def get_stats(timeFrame: str):
    key = f"WAKATIME/STATS/{timeFrame}"
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
        if data["is_up_to_date"] and data["status"] == "ok":
            stats = data
            break
        print(f"Waiting 3 minutes before attempting again")
        time.sleep(180)
    return stats
