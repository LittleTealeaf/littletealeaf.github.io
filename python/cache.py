import json
import os
from random import Random
from time import time

VALID_FILE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-"

def store_cache(key,value):
    key = sanitize_key(key)

    cache = load_cache(key)
    if cache != None:
        if cache['value'] == value:
            cache['duration'] = min(60 * 60 * 24 * 7,cache['duration'] * 1.5)
        else:
            cache['duration'] = max(1,cache['duration'] / 2)
        cache['expires'] = time() + 60 * 60 * cache['duration']
    else:
        cache = {
            'value': value,
            'expires': time() + 60 * 60 * 6,
            'duration': 6
        }
    os.makedirs(os.path.join('.','cache'),exist_ok=True)
    with open(os.path.join('.','cache',key),'w') as f:
        f.write(json.dumps(cache,separators=(',',':')))


def get_cache(key):
    key = sanitize_key(key)
    cache = load_cache(key)
    if cache != None and cache['expires'] > time():
        return cache['value']
    else:
        return None


def load_cache(key):
    if os.path.exists(os.path.join('.','cache',key)):
        with open(os.path.join('.','cache',key)) as f:
            return json.load(f)
    else:
        return None


def sanitize_key(key):
    rand = Random(key)
    return "".join(rand.choices(VALID_FILE_CHARACTERS,k=10)) + '.json'
