import os, json

ANALYTICS_FILE = 'analytics.json'

def analytics_delete():
    if os.path.exists(ANALYTICS_FILE):
        os.remove(ANALYTICS_FILE)

def anayltics_load():
    analytics = {
        'api_calls': 0
    }
    if os.path.exists(ANALYTICS_FILE):
        with open(ANALYTICS_FILE) as file:
            analytics = json.load(file)
    return analytics
    
def analytics_save(analytics):
    with open(ANALYTICS_FILE,'w') as file:
        file.write(json.dumps(analytics))

def analytics_ping_api_call():
    analytics = anayltics_load()
    analytics['api_calls'] = analytics['api_calls'] + 1
    analytics_save(analytics)