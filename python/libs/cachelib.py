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

def sanitize_key(key):
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

    def get(self, key):
        try:
            path = self.file_name(key)
            if os.path.exists(path):
                with open(path) as file:
                    data = json.load(file)
                    if data['expires'] > get_time():
                        return data['value']
        except:
            ...
        return None

    def set(self, key, value, expires=EXPIRES_DEFAULT, expires_min = EXPIRES_DEFAULT_MIN, expires_max = EXPIRES_DEFAULT_MAX, expires_step=EXPIRES_DEFAULT_STEP,expires_dynamic=True):
        path = self.file_name(key)
        expire_time = expires
        if os.path.exists(path) and expires_dynamic:
            try:
                with open(path) as file:
                    old = json.load(file)
                    if 'cache_duration' in old:
                        if old['value'] == value:
                            expire_time = min(expires_max,old['cache_duration'] + 1)
                        else:
                            expire_time = max(expires_min,old['cache_duration'] - 1)
            except:
                ...
        else:
            os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as file:
            file.write(json.dumps({
                'expires': get_time() + millis(expire_time),
                'cache_duration': expire_time,
                'value': value
            },separators=(',',':')))

    def remove(self, key):
        os.remove(self.file_name(key))

    def file_name(self, key):
        return os.path.join(self.path, f'{sanitize_key(key)}.json')

    def analytics(self):
        return {}


def clean():
    expired_files = []
    for dir, dirs, files in os.walk(BASE_PATH):
        for fn in files:
            try:
                with open(os.path.join(dir, fn)) as file:
                    data = json.load(file)
                    if data['expires'] < get_time():
                        expired_files.append(os.path.join(dir, fn))
            except:
                expired_files.append(os.path.join(dir,fn))
    for file in expired_files:
        os.remove(file)
