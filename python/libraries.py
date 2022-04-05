import os
import time
import json
from tokenize import Number
import requests


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
            file.write(json.dumps(cache))

    def get(self, key):
        cache = self.load()
        if key in cache:
            if cache[key]['expires'] > self.get_time():
                return cache[key]['value']
            else:
                cache.pop(key)
                self.save(cache)
        return None

    def set(self, key, value, expire_time=24 * 60 * 60 * 1000):
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
        if os.path.exists(os.path.join('.', 'github_token')):
            with open(os.path.join('.', 'github_token')) as file:
                self.token = file.readline()
        else:
            self.token = os.environ['API_GITHUB']

        self.cache = Cache('api','github')

    def getRequest(self, url: str, headers: dict={}, params: dict={}):
        headers = headers.copy()
        headers['authorization'] = f'token {self.token}'
        request = requests.get(url,params=params,headers=headers)
        if request.status_code == 200:
            return request
        else:
            return None
    
    def getAPI(self,url: str,headers: dict={},params: dict={}):
        key = f'{url} {json.dumps(headers)} {json.dumps(params)}'
        cached = self.cache.get(key)
        if cached:
            return cached
        data = self.getRequest(url,headers=headers,params=params).json()
        self.cache.set(key,data)
        return data
    
    def getAPIList(self,url: str,headers: dict={}, params: dict={}, count: int = -1):
        data = []
        headers = headers.copy()
        params = params.copy()
        params['per_page'] = 100
        params['page'] = 1
        while count == -1 or len(data) < count:
            fetched: list = self.getAPI(url,headers,params)
            length = len(fetched)
            while len(fetched) > 0 and len(data) < count:
                data.append(fetched.pop(0))
            if length < params['per_page']:
                break
            params['page'] = params['page'] + 1
        return data


Github = GithubAPI()
