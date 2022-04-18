import os
import json
from random import Random
import time
import libs.config

BASE_PATH = os.path.join('.','cache')
DURATION = 6
DURATION_MIN = 3
DURATION_MAX = 24 * 14
DURATION_SCALE_UP = 1.5
DURATION_SCALE_DOWN = 0.5
DELETE_TIME = 24
VALID_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-"

VERSION = 5


def convertHours(hours):
    return hours * 60 * 60

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

def reportCaches():
    report = {}
    def addReport(dictionary, path,name,value):
        if len(path) > 0:
            if path[0] not in dictionary:
                dictionary[path[0]] = {}
            addReport(dictionary[path[0]],path[1:],name,value)
        else:
            dictionary[name] = value
    def list_dir(path,route=[]):
        for file in os.listdir(path):
            fpath = os.path.join(path,file)
            if os.path.isdir(fpath):
                list_dir(fpath,route + [file])
            else:
                filereport = {}
                with open(fpath) as ofile:
                    data = json.load(ofile)
                    for key in data:
                        filereport[key] = {
                            'expires': data[key]['expires'],
                            'expires_in': data[key]['expires'] - time.time(),
                            'duration': data[key]['duration'],
                            'populated': 'value' in data[key] and data[key]['value'] != None
                        }

                addReport(report,route,file,filereport)
    list_dir(BASE_PATH)
    return report
