from functools import partial
import math
import os
import json
from random import Random
import time

BASE_PATH = os.path.join('.', 'cache')

EXPIRES_DEFAULT_MIN = 1
EXPIRES_DEFAULT_MAX = 168
EXPIRES_DEFAULT = (EXPIRES_DEFAULT_MAX + EXPIRES_DEFAULT_MIN) / 2
EXPIRES_DEFAULT_STEP = 5

VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-'

def millis(hours):
    return int(round(hours * 60 * 60 * 1000))

def sanitize_source(key):
    rand = Random(key)

    def sanitize(char):
        if char in VALID_CHARACTERS:
            return char
        else:
            return ''
    sanitized = ''.join([sanitize(c) for c in key])
    return f"{sanitized}{''.join(rand.sample(VALID_CHARACTERS,len(key) - len(sanitized)))}"


def get_time():
    return int(round(time.time() * 1000))


class Cache:
    def __init__(self, *path):
        self.path = os.path.join(BASE_PATH, *path)

    def set(self,key,value,source='default', expires=EXPIRES_DEFAULT,expires_min=EXPIRES_DEFAULT_MIN,expires_max=EXPIRES_DEFAULT_MAX,expires_step=EXPIRES_DEFAULT_STEP):
        duration = expires
        src = self.load_source(source)
        try:
            if src[key]['expires'] < get_time() and expires != -1:
                if src[key]['value'] == value:
                    duration = math.min(expires_max,src[key]['duration'] + expires_step)
                else:
                    duration = math.max(expires_min,src[key]['duration'] - expires_step)
        except:
            ...
        src[str(key)] = {
            'expires': millis(duration) + get_time(),
            'duration': duration,
            'value': value
        }
        self.save_source(source,src)



    def get(self,key,source='default'):
        try:
            src = self.load_source(source)
            if src[key]['expires'] > get_time():
                return src[key]['value']
        except:
            return None

    def load_source(self,source):
        try:
            with open(os.path.join(self.path,f"{sanitize_source(source)}.json")) as file:
                return json.load(file)
        except:
            return {}
    def save_source(self,source,values):
        path = os.path.join(self.path,f'{sanitize_source(source)}.json')
        os.makedirs(os.path.dirname(path),exist_ok=True)
        with open(path,'w') as file:
            file.write(json.dumps(values,separators=(',',':')))

    def analytics(self):
        return {}

CACHE_MAX_SIZE = 1 * 10**9

def cache_size():
    size = 0
    for dir,_,files in os.walk(BASE_PATH):
        for f in files:
            size += os.path.getsize(os.path.join(dir,f))
    return size

def clean(partial_wipe=False, full_wipe = False):
    print(f"Start Cache Size (bytes): {cache_size()}")
    for dir,_,files in os.walk(BASE_PATH):
        for f in files:
            fp = os.path.join(dir,f)
            if full_wipe:
                os.remove(fp)
            else:
                try:
                    data = None
                    with open(fp) as file:
                        data = json.load(file)
                    for key in data:
                        if partial_wipe or data[key]['expires'] < get_time() and 'value' in data[key]:
                            print(f'Removing Key: {fp} {key}')
                            del data[key]['value']
                    with open(fp,'w') as file:
                        file.write(json.dumps(data))
                except:
                    print(f'Crash-Cleaning {fp}')
                    os.remove(fp)
    print(f"Final Cache Size (bytes): {cache_size()}")
