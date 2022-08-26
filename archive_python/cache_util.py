import json
import os
from pathlib import Path
from random import Random
from time import time

VERSION = '5'
DEFAULT_TIME = 6
MIN_TIME = 1
MAX_TIME = 72

VALID_FILE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-"


def store_cache(key,value):
    cache = {
        'value': value,
        'expires': time() + 60 * 60 * DEFAULT_TIME,
        'duration': DEFAULT_TIME
    }

    fileName = get_file(key)

    if os.path.exists(fileName):
        with open(fileName) as f:
            old_cache = json.load(f)

            if json.dumps(value) == json.dumps(old_cache['value']):
                cache['duration'] = min(MAX_TIME,old_cache['duration'] * 1.5)
            else:
                cache['duration'] = max(MIN_TIME,old_cache['duration'] / 2)
            cache['expires'] = time() + 60 * 60 * cache['duration']

    os.makedirs(os.path.join('.','cache'),exist_ok=True)
    with open(fileName,'w') as f:
        f.write(json.dumps(cache))

def get_cache(key):
    fileName = get_file(key)

    if not os.path.exists(fileName):
        return None

    with open(fileName) as f:
        data = json.load(f)

        if data['expires'] < time():
            return None

        return data['value']

def get_file(key):
    seed = f'{VERSION}{key}'
    random = Random(seed)
    fileName = "".join(random.choices(VALID_FILE_CHARACTERS,k=10)) + ".json"
    return os.path.join('.','cache',fileName)

def clean_cache():
    if os.path.exists(os.path.join('.','cache')):
        for file in os.listdir(os.path.join('.','cache')):
            mark_delete = False
            with open(os.path.join('.','cache',file)) as f:
                cache = json.load(f)
                if cache['expires'] < time() - 60 * 60 * DEFAULT_TIME:
                    mark_delete = True
            if mark_delete:
                os.remove(os.path.join('.','cache',file))
