
from random import Random
from urllib.parse import urlparse
import urllib3
from libs.cache import Cache
import libs.github as Github
from bs4 import BeautifulSoup


cache = Cache('markdown')

HASH_CHARACTERS = [chr(i) for i in range(32,127)]
HASH_CHARACTERS.remove('\\')
HASH_CHARACTERS.remove('"')

def hashText(text):
    return ''.join(Random(text).choices(HASH_CHARACTERS,k=len(text)))

def renderURL(url,context=None,link_src="",link_href=""):
    cached = cache.get(url,source='url')
    if cached != None:
        print(f'CACHE MARKDOWN URL {url}')
        return cached

    with urllib3.PoolManager().request('GET',url,preload_content=False) as r:
        print(f'API MARKDOWN URL {url}')
        value = Github.renderMarkdown(''.join([line.decode('utf-8') for line in r]),context=context)
        value = relink_html(value,link_href=link_href,link_src=link_src)
        cache.set(url,value,source='url')
        return value

def renderRaw(text,link_src="",link_href=""):

    cached = cache.get(text,source='raw')
    if cached != None:
        print(f'CACHE MARKDOWN RAW')
        return cached

    print(f'API MARKDOWN RAW')
    value = Github.renderMarkdown(text)
    value = relink_html(value,link_href=link_href,link_src=link_src)
    cache.set(text,value,source='raw')
    return value

def renderHash(text,link_src="",link_href=""):
    """
    Similar to renderRaw, but hashes the text as the key
    """
    key = hashText(text)
    cached = cache.get(key,source='hash')
    if cached != None:
        print(f'CACHE MARKDOWN HASH {key[:100]}')
        return cached

    print(f'API MARKDOWN HASH {key[:100]}')
    value = Github.renderMarkdown(text)
    value = relink_html(value,link_href=link_href,link_src=link_src)
    cache.set(key,value,source='hash')
    return value

def relink_html(html,link_href,link_src):
    soup = BeautifulSoup(html,features='html.parser')
    if link_href != None:
        for tag in ['a']:
            for i in soup.findAll(tag):
                try:
                    if not (bool(urlparse(i['href']).netloc) or '#' in i['href']):
                        i['href'] = link_href + i['href']
                except:
                    ...
    if link_src != None:
        for tag in ['img']:
            for i in soup.findAll(tag):
                try:
                    if not (bool(urlparse(i['src']).netloc) or '#' in i['src']):
                        i['src'] = link_src + i['src']
                except:
                    ...

    return str(soup)