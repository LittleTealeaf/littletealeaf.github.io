import os
import util_json as json
import datetime
import util_temp as tmp

FILE_NAME = tmp.tmp_path('analytics.json')

class Keys:
    "Indicates the key values used within the final analytics json"
    GITHUB_API_CALLS = 'Github API Calls'
    IMAGE_REQUESTS = 'Image Requests'
    LAST_UPDATED = 'Last Updated'
    REPOSITORY_REQUESTS = 'Repository APIs'
    USER_REQUESTS = 'User APIs'
    EVENT_REQUESTS = 'Event APIs'
    ASSET_COUNT = 'Generated Assets Used'

DEFAULTS: dict = {
    Keys.GITHUB_API_CALLS: 0,
    Keys.ASSET_COUNT: 0,
    Keys.IMAGE_REQUESTS: 0,
    Keys.USER_REQUESTS: 0,
    Keys.EVENT_REQUESTS: 0,
    Keys.IMAGE_REQUESTS: 0,
    Keys.REPOSITORY_REQUESTS: 0,
    Keys.LAST_UPDATED: ''
}
"The default dictionary to use if a file could not be laoded"

INCREMENT = lambda item: item + 1

def load() -> dict:
    "Attempts to retrieve the current analytics from the json file. Returns a copy of DEFAULTS if no file exists"
    if os.path.exists(FILE_NAME):
        return json.load(path=FILE_NAME)
    else:
        return DEFAULTS.copy()

def update(updater) -> None:
    "Loads the data, runs the 'updater' as a method with the analytics dictionary as a parameter, then saves the data"
    data = load()
    updater(data)
    json.save(data,path=FILE_NAME)

def update_value(key: str, value_updater) -> None:
    "Updates a specific value using the value_updater. Handles loading and saving the analytics"
    data = load()
    data[key] = value_updater(data[key])
    json.save(data,path=FILE_NAME)

def compile() -> list[dict]:
    """
    Loads the current analytics, and performs final operations on it before compiling and returning the data as a list

    The return value returns a list of objects (dicts), containing the 'name' (str) and 'value' (int) values.
    """
    data = load()
    data[Keys.ASSET_COUNT] = get_asset_count()
    data[Keys.LAST_UPDATED] = datetime.datetime.now().strftime("%m/%d/%Y %H:%M")

    analytics = [{'name':key,'value':data[key]} for key in data]
    return analytics

def ref() -> str:
    "Returns a reference to a compiled analytics file"
    return json.ref(compile())


def get_asset_count():
    "Returns the number of assets currently in the generated folder"
    count = 0
    for dirpath, dirnames, filenames in os.walk(os.path.join('.','generated')):
        count += len(filenames)
    return count

def ping_api() -> None:
    "Increments the api count by 1"
    update_value(Keys.GITHUB_API_CALLS,INCREMENT)

def ping_image() -> None:
    "Increments the image count by 1"
    update_value(Keys.IMAGE_REQUESTS, INCREMENT)

def ping_user() -> None:
    "Increments the user count by 1"
    update_value(Keys.USER_REQUESTS,INCREMENT)

def ping_event() -> None:
    "Increments the event count by 1"
    update_value(Keys.EVENT_REQUESTS,INCREMENT)

def ping_repo() -> None:
    "Increments the repository count by 1"
    update_value(Keys.REPOSITORY_REQUESTS,INCREMENT)
