import time
import os
import json
import shutil

PATH = os.path.join('.','cache')

EXPIRE_TIME = 1000 * 60 * 60 * 24

class Cache:
    def __init__(self,*path):
        self.path = os.path.join(PATH,*path) + '.json'
    
    def load(self):
        cache = {}
        if os.path.exists(self.path):
            with open(self.path) as file:
                cache = json.load(file)
        return cache
    
    def save(self,cache):
        os.makedirs(os.path.dirname(self.path),exist_ok=True)
        with open(self.path,'w') as file:
            file.write(json.dumps(cache))
    
    def get(self,key):
        cache = self.load()
        if key in cache:
            if cache[key]['expires'] > get_time():
                return cache[key]['value']
        return None

    def store(self,key,value):
        cache = self.load()
        cache[key] = {
            'expires': get_time() + EXPIRE_TIME,
            'value': value
        }
        self.save(cache)


def get_time():
    return int(round(time.time() * 1000))
