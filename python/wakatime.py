import requests
import os

from cache_util import store_cache, get_cache

try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    ...

def getWakaData(endpoint: str, params: dict = {}):

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
        # headers={
        #     "Authorization": f'Basic {base64.b64encode(os.getenv("WAKA_TOKEN").encode("ascii"))}'
        # },
    )
    print(endpoint)

    if response:
        data = response.json()

        store_cache(key, data)
        return data
    print(response.text)
