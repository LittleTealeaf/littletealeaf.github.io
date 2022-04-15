import os
import json
from random import Random
import time


BASE_PATH = os.path.join('.','cache')
DURATION = 6
EXPIRES_MIN = 1
EXPIRES_MAX = 24 * 14
EXPIRES_SCALE_UP = 1.5
EXPIRES_SCALE_DOWN = 0.5
EXPIRES_DELETE_TIME = 24

VERSION = 4

VALID_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-'

# Add markdown file to handle both markdown from a url and from a text

def getTime():
    return int(round(time.time()))

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

    def set(self,key,value,source='default',duration:int=6,expires_min:int=EXPIRES_MIN,expires_max:int=EXPIRES_MAX,expires_scale_up:int=EXPIRES_SCALE_UP,expires_scale_down:int=EXPIRES_SCALE_DOWN):
        src = self.load_source(source)
        try:
            if src[key]['expires'] < getTime() or duration==-1:
                if src[key]['value'] == value:
                    duration = min(expires_max,src[key]['duration'] * expires_scale_up)
                else:
                    duration = max(expires_min,src[key]['duration'] * expires_scale_down)
        except:
            ...
        src[key] = {
            'expires': getTime() + convertHours(duration),
            'duration': duration,
            'version': VERSION,
            'value': value
        }
        self.save_source(source,src)

    def get(self,key,source='default'):
        try:
            src = self.load_source(source)
            if src[key]['expires'] > getTime() and src[key]['version'] == VERSION:
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
                        if partial_wipe or data[key]['expires'] < getTime() and 'value' in data[key]:
                            print(f'Removing Key: {fp} {key[:100]}{"..." if len(key) > 100 else ""}')
                            del data[key]['value']
                        elif data[key]['expires'] < getTime() - convertHours(EXPIRES_DELETE_TIME) or data[key]['version'] != VERSION:
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
