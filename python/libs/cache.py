import os
import json
from random import Random
import time
import libs.config

conf = libs.config.getConfig()['cache']

BASE_PATH = os.path.join(*conf['base_path'])
DURATION = conf['duration']['default']
DURATION_MIN = conf['duration']['min']
DURATION_MAX = conf['duration']['max']
DURATION_SCALE_UP = conf['duration']['scale']['up']
DURATION_SCALE_DOWN = conf['duration']['scale']['down']
DELETE_TIME = conf['delete']

VERSION = 5

VALID_CHARACTERS = conf['characters']

# Add markdown file to handle both markdown from a url and from a text

def convertHours(hours):
    return hours * 60 * 60

# def hashKey(key):
#     length = max(int(len(key) / 2),10) if key != None else 10

#     return ''.join(Random(str(key)).choices(VALID_CHARACTERS,k=length))

def sanitize_source(key):
    rand = Random(key)

    def sanitize(char):
        if char in VALID_CHARACTERS:
            return char
        else:
            return ''
    sanitized = ''.join([sanitize(c) for c in key])
    return f"{sanitized}{''.join(rand.sample(VALID_CHARACTERS,len(key) - len(sanitized)))}"

class Cache:
    def __init__(self,*path):
        self.path = os.path.join(BASE_PATH,*path)

    def set(self,key,value,source='default',duration:int=DURATION,duration_min:int=DURATION_MIN,duration_max:int=DURATION_MAX,duration_scale_up:int=DURATION_SCALE_UP,duration_scale_down:int=DURATION_SCALE_DOWN):
        src = self.load_source(source)
        try:
            if src[key]['expires'] < time.time() or duration==-1:
                if src[key]['value'] == value:
                    duration = min(duration_max,src[key]['duration'] * duration_scale_up)
                else:
                    duration = max(duration_min,src[key]['duration'] * duration_scale_down)
        except:
            ...
        src[key] = {
            'expires': time.time() + convertHours(duration),
            'duration': duration,
            'version': VERSION,
            'value': value
        }
        self.save_source(source,src)

    def get(self,key,source='default'):
        try:
            src = self.load_source(source)
            if src[key]['expires'] > time.time() and src[key]['version'] == VERSION:
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
        path = os.path.join(self.path,f"{sanitize_source(source)}.json")
        os.makedirs(os.path.dirname(path),exist_ok=True)
        with open(path,'w') as file:
            file.write(json.dumps(values,separators=(',',':')))

    def analytics(self):
        return {}

def cache_size():
    size = 0
    for dir,_,files in os.walk(BASE_PATH):
        for f in files:
            size += os.path.getsize(os.path.join(dir,f))
    return size

def clean(partial_wipe=False, full_wipe=False):
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
                    wipe_keys = []
                    for key in data:
                        if partial_wipe or data[key]['expires'] < time.time() and 'value' in data[key]:
                            print(f'Removing Key: {fp} {key[:100]}{"..." if len(key) > 100 else ""}')
                            del data[key]['value']
                        elif data[key]['expires'] < time.time() - convertHours(DELETE_TIME) or data[key]['version'] != VERSION:
                            wipe_keys.append(key)
                    for key in wipe_keys:
                        print(f'Removing Key: {fp} {key[:100]}')
                        del data[key]
                    with open(fp,'w') as file:
                        file.write(json.dumps(data,separators=(',',':')))
                except Exception as e:
                    print(f'Crash-Cleaning {fp}')
                    os.remove(fp)
    print(f"Final Cache Size (bytes): {cache_size()}")
