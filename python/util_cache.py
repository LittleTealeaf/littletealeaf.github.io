import os
import random
import json
import time
import random
import util_assets as assets



def save(key: str, value: any, expire_min: int = 0, expire_max: int = 24):
    file_name: str = hash_key(key)
    path = os.path.join('.','cache',f'{file_name}.json')

    expires = current_time() + random.randint(expire_min,expire_max) * 1000 * 60 * 60

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

def clean():
    expired = []
    for dir,dirs,files in os.walk(os.path.join('.','cache')):
        for file in files:
            with open(os.path.join(dir,file)) as f:
                if json.load(f)['expires'] < current_time():
                    expired.append(os.path.join(dir,file))
    for file in expired:
        os.remove(file)