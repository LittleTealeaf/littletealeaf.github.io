import os
import random
import json
import time
import util_assets as assets



def save(key: str, value: any, expire_hours: int = 24):
    file_name: str = hash_key(key)
    path = os.path.join('.','cache',f'{file_name}.json')

    expires = current_time() + expire_hours * 1000 * 60 * 60
    
    

    if not os.path.exists(os.path.join('.','cache')):
        os.mkdir(os.path.join('.','cache'))
    with open(path,'w') as file:
        file.write(json.dumps({
            'key': key,
            'hash': file_name,
            'cachetime': current_time(),
            'expires': expires,
            'value': value
        }))

def load(key: str):
    file_name: str = hash_key(key)
    path = os.path.join('.','cache',f'{file_name}.json')
    
    if os.path.exists(path):
        data = None
        with open(path) as file:
            data = json.load(file)
        if data['expires'] > current_time():
            print(f'CHE: {key}')
            return data['value']
    return None

def hash_key(key: str) -> str:
    random.seed(key)
    return ''.join(random.sample(assets.VALID_CHARACTERS,15))


def current_time() -> int:
    return int(round(time.time() * 1000)) 