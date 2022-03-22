import os
import util_json as json
import datetime

FILE_NAME = 'analytics.json'

class Keys:
    GITHUB_API_CALLS = 'Github API Calls'
    IMAGE_REQUESTS = 'Image Requests'
    LAST_UPDATED = 'Last Updated'
    ASSET_COUNT = 'Generated Assets Used'

DEFAULTS: dict = {
    Keys.GITHUB_API_CALLS: 0,
    Keys.ASSET_COUNT: 0,
    Keys.IMAGE_REQUESTS: 0,
    Keys.LAST_UPDATED: ''
}

def clear() -> None:
    if os.path.exists(FILE_NAME):
        os.remove(FILE_NAME)

def load() -> dict:
    if os.path.exists(FILE_NAME):
        return json.load(path=FILE_NAME)
    else:
        return DEFAULTS.copy()

def update(updater) -> None:
    data = load()
    updater(data)
    json.save(data,path=FILE_NAME)

def update_value(key: str, value_updater) -> None:
    data = load()
    data[key] = value_updater(data[key])
    json.save(data,path=FILE_NAME)


def ping_api() -> None:
    update_value(Keys.GITHUB_API_CALLS,lambda item: item + 1)

def ping_image() -> None:
    update_value(Keys.IMAGE_REQUESTS, lambda item: item + 1)

def compile() -> dict:
    data = load()
    data[Keys.ASSET_COUNT] = get_asset_count()
    data[Keys.LAST_UPDATED] = datetime.datetime.now().strftime("%m/%d/%Y %H:%M")

    analytics = [{'name':key,'value':data[key]} for key in data]
    return analytics

def ref() -> str:
    return json.ref(compile())


def get_asset_count():
    count = 0
    for dirpath, dirnames, filenames in os.walk(os.path.join('.','generated')):
        count += len(filenames)
    return count