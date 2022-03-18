import os, json, requests
from assetutil import *
from apiutil import *

RENDERED_MARKDOWN=['html']

def render_markdown(text):
    return requests.post('https://api.github.com/markdown',headers={
        'authorization':f'token {API_TOKEN_GITHUB}',
        'accept':'application/vnd.github.v3+json'
    },json={
        'text':text
    }).text

def ref_render_markdown(url,asset=None, path=RENDERED_MARKDOWN,seedURL=False):
    md = requests.get(url).text
    if not asset:
        asset = Asset(path=path,seed=(url if seedURL else md),type=HTML)
    with open(asset.path,'w', encoding='utf-8') as file:
        file.write(render_markdown(requests.get(url).text))
    return asset.ref