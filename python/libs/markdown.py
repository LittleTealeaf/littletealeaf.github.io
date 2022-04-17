
import os
from random import Random
from urllib.parse import urlparse
import frontmatter
import urllib3
from libs.cache import Cache
import libs.github as Github
import libs.index as Index
from bs4 import BeautifulSoup
from pathlib import Path

from libs.generated import Gen

cache = Cache('markdown')


PATH = os.path.join('.','markdown')

HASH_CHARACTERS = [chr(i) for i in range(32,127)]
HASH_CHARACTERS.remove('\\')
HASH_CHARACTERS.remove('"')

def hashText(text):
    return ''.join(Random(text).choices(HASH_CHARACTERS,k=min(len(text),100)))

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
    key = hashText(text + str(link_src) + str(link_href))
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
                        i['href'] = clean_link(link_href + i['href'])
                except:
                    ...
    if link_src != None:
        for tag in ['img']:
            for i in soup.findAll(tag):
                try:
                    if not (bool(urlparse(i['src']).netloc) or '#' in i['src']):
                        i['src'] = clean_link(link_src + i['src'])
                except:
                    ...

    return str(soup)

def clean_link(url):
    parsed = str(url).split('/')
    # Remove single .
    while '.' in parsed:
        parsed.remove('.')

    while '..' in parsed:
        for i in range(len(parsed)):
            if parsed[i] == '..':
                parsed.pop(i)
                parsed.pop(i-1)
                break
    return '/'.join(parsed)


def renderDirectory():
    def iteration(path,route=[]):
        for file in os.listdir(path):
            fpath = os.path.join(path,file)
            if os.path.isdir(fpath):
                iteration(fpath,route + [file])
            else:
                post = frontmatter.load(fpath).to_dict()
                stem = Path(fpath).stem
                post['content'] = renderHash(post['content'],**{
                    'link_href': f'https://github.com/LittleTealeaf/littletealeaf.github.io/tree/main/markdown/{"/".join(route) if len(route) > 0 else "."}/',
                    'link_src': f'https://raw.githubusercontent.com/LittleTealeaf/littletealeaf.github.io/main/markdown/{"/".join(route) if len(route) > 0 else "."}/'
                })
                post['markdown generator'] = 'Github Markdown API'
                Index.set(['markdown'] + route + [stem],Gen(*(['markdown'] + route + [stem])).ref_json(post))
    iteration(PATH)
