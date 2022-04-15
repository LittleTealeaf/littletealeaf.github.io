
from random import Random
import urllib3
from libs.cache import Cache
import libs.github as Github


cache = Cache('markdown')

HASH_CHARACTERS = [chr(i) for i in range(32,127)]
HASH_CHARACTERS.remove('\\')
HASH_CHARACTERS.remove('"')

def hashText(text):
    return ''.join(Random(text).choices(HASH_CHARACTERS,k=len(text)))

def renderURL(url,context=None):
    cached = cache.get(url,source='url')
    if cached != None:
        print(f'CACHE MARKDOWN URL {url}')
        return cached

    with urllib3.PoolManager().request('GET',url,preload_content=False) as r:
        print(f'API MARKDOWN URL {url}')
        value = Github.renderMarkdown(''.join([line.decode('utf-8') for line in r]),context)
        cache.set(url,value,source='url')
        return value

def renderRaw(text):

    cached = cache.get(text,source='raw')
    if cached != None:
        print(f'CACHE MARKDOWN RAW')
        return cached

    print(f'API MARKDOWN RAW')
    value = Github.renderMarkdown(text)
    cache.set(text,value,source='raw')
    return value

def renderHash(text):
    """
    Similar to renderRaw, but hashes the text as the key
    """
    key = hashText(text)
    cached = cache.get(key,source='hash')
    if cached != None:
        print(f'CACHE MARKDOWN HASH {key}')
        return cached

    print(f'API MARKDOWN HASH {key[:100]}')
    value = Github.renderMarkdown(text)
    cache.set(key,value,source='hash')
    return value
