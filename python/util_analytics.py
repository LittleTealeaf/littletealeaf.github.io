import os
import util_json as json
import datetime

FILE_NAME = 'analytics.json'

class Keys:
    GITHUB_API_CALLS = 'Github API Calls'
    IMAGE_REQUESTS = 'Image Requests'
    LAST_UPDATED = 'Last Updated'

DEFAULTS: dict = {
    Keys.GITHUB_API_CALLS: 0,
    Keys.IMAGE_REQUESTS: 0
}

def clear():
    if os.path.exists(FILE_NAME):
        os.remove(FILE_NAME)

def load():
    if os.path.exists(FILE_NAME):
        return json.load(path=FILE_NAME)
    else:
        return DEFAULTS.copy()

def update(updater):
    data = load()
    updater(data)
    json.save(data,path=FILE_NAME)

def update_value(key: str, value_updater):
    data = load()
    data[key] = value_updater(data[key])
    json.save(data,path=FILE_NAME)


def ping_api():
    update_value(Keys.GITHUB_API_CALLS,lambda item: item + 1)

def ping_image():
    update_value(Keys.IMAGE_REQUESTS, lambda item: item + 1)

def compile():
    data = load()
    data[Keys.LAST_UPDATED] = str(datetime.datetime.now())
    analytics = [{'name':key,'value':data[key]} for key in data]
    return analytics

def ref():
    return json.ref(compile())