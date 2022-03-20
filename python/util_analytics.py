import os
import util_json as json

TEMP_FILE = 'analytics.json'

KEY_API = 'api_calls'
KEY_IMAGE = 'image_calls'
REMAINING_API_CALLS = 'remaining_api_calls'

def clean():
    if os.path.exists(TEMP_FILE):
        os.remove(TEMP_FILE)

def load():
    analytics = {
        KEY_API: 0,
        KEY_IMAGE: 0,
        REMAINING_API_CALLS: 5000
    }
    if os.path.exists(TEMP_FILE):
        analytics = json.load(path=TEMP_FILE)
    return analytics

def save(analytics):
    json.save(analytics,path=TEMP_FILE)

def ping_api():
    state = load()
    state[KEY_API] = state[KEY_API] + 1
    save(state)

def ping_image():
    state = load()
    state[KEY_IMAGE] = state[KEY_IMAGE] + 1
    save(state)

def update_remaining_api(request):
    state = load()
    state[REMAINING_API_CALLS] = request.headers['x-ratelimit-remaining']
    save(state)