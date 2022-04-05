import os
import time
import json


class Cache:
    def __init__(self,*path):
        self.path = os.path.join('.','cache',*path) + '.json'

    @classmethod
    def load(self):
        cache = {}
        if os.path.exists(self.path):
            with open(self.path) as file:
                cache = json.load(file)
        return cache
    
    @classmethod
    def save(self,cache):
        os.makedirs(os.path.dirname(self.path),exist_ok=True)
        with open(self.path,'w') as file:
            file.write(json.dumps(cache))
    
    @classmethod
    def get(self,key):
        cache = self.load()
        if key in cache:
            if cache[key]['expires'] > self.get_time():
                return cache[key]['value']
            else:
                cache.pop(key)
                self.save(cache)
        return None
    
    @classmethod
    def set(self,key,value, expire_time = 24 * 60 * 60 * 1000):
        cache = self.load()
        cache[key] = {
            'expires': Cache.get_time() + expire_time,
            'value': value
        }
        self.save(cache)
        print(f'Updated Cache: {key}')

    @staticmethod        
    def get_time():
        return int(round(time.time() * 1000))

class GithubAPI:
    def __init__(self):
        if os.path.exists(os.path.join('.','github_token')):
            with open(os.path.join('.','github_token')) as file:
                self.token = file.readline()
        else:
            self.token = os.environ['API_GITHUB']
    
    def getRequest(self,url: str,headers: dict,params: dict):
        headers = headers.copy()
        headers['authorization'] = f'token {self.token}'


Github = GithubAPI()
