import os
import json
from random import Random
import time


EXPIRES_DEFAULT = 1000 * 60 * 60 * 24

VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789_-'

def sanitize_key(key):
    rand = Random(key)
    def sanitize(char):
        if char in VALID_CHARACTERS:
            return char
        else:
            return rand.choice(VALID_CHARACTERS)
    return ''.join([sanitize(c) for c in key])

def get_time():
    return int(round(time.time() * 1000))

class Cache:
    def __init__(self,*path):
        self.path = os.path.join('.','cache',*path)

    def get(self,key):
        path = self.file_name(key)
        if os.path.exists(path):
            with open(path) as file:
                data = json.load(file)
                if data['expires'] > get_time():
                    return data['value']
        return None
            

    def set(self,key,value,expires=EXPIRES_DEFAULT):
        path = self.file_name(key)
        os.makedirs(os.path.dirname(path),exist_ok=True)
        with open(path,'w') as file:
            file.write(json.dumps({
                'expires': get_time() + expires,
                'value': value
            }))
    
    def remove(self,key):
        os.remove(self.file_name(key))
    
    def file_name(self,key):
        return os.path.join(self.path,f'{sanitize_key(key)}.json')
    
    def analytics(self):
        return {}
