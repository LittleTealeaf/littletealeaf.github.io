import os
import json
import time

class Cache:
    def __init__(self, *path):
        self.path = os.path.join('.', 'cache', *path) + '.json'
        for key in self.load():
            self.get(key)

    def load(self):
        cache = {}
        if os.path.exists(self.path):
            with open(self.path) as file:
                cache = json.load(file)
        return cache

    def save(self, cache):
        os.makedirs(os.path.dirname(self.path), exist_ok=True)
        with open(self.path, 'w') as file:
            file.write(json.dumps(cache,separators=(',', ':')))

    def get(self, key):
        cache = self.load()
        if key in cache:
            if cache[key]['expires'] > get_time():
                return cache[key]['value']
            else:
                cache.pop(key)
                self.save(cache)
        return None

    def set(self, key, value, expire_time=24 * 60 * 60 * 1000):
        cache = self.load()
        cache[key] = {
            'expires': get_time() + expire_time,
            'value': value
        }
        self.save(cache)
        print(f'Updated Cache: {key}')


def get_time():
    return int(round(time.time() * 1000))
