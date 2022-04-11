from io import BytesIO
import json
import math
import os
from PIL import Image, ImageDraw, ImageFilter
import requests
from libs.cachelib import Cache
import numpy as np

EXPIRES_DEFAULT = 24
EXPIRES_MAX = 336
EXPIRES_MIN = 0
EXPIRES_STEP = 12
DEFAULT_PRIORITY = -1


cache = Cache('images')


def get(url: str, circular: bool = False, expires=EXPIRES_DEFAULT, expires_min=EXPIRES_MIN, expires_max=EXPIRES_MAX, expires_step=EXPIRES_STEP, priority=DEFAULT_PRIORITY):
    key_dict = {
        'circular': circular
    }
    key = f"{url}{key_dict}"

    cached = cache.get(key)
    try:
        if cached != None:
            print(f'CACHED IMAGE: ')
            return fromJSON(cached)
    except:
        ...

    print(f"IMAGE: {key}")
    img = Image.open(BytesIO(requests.get(url).content)).convert('RGBA')

    if circular:
        h, w = img.size

        alpha = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(alpha)
        draw.ellipse((0, 0, h, w), fill=255)

        img.putalpha(alpha.filter(ImageFilter.GaussianBlur(4)))

    cache.set(key, toJSON(img), expires=expires,
              expires_min=expires_min, expires_max=expires_max, expires_step=expires_step, priority=priority)
    return img

def toJSON(img):
    base = -1
    arr = np.array(img).tolist()
    for a in arr:
        for b in a:
            for c in b:
                if c > base:
                    base = c
    return {
        'base': base,
        'image': [[list_pack(b,size=base) for b in a] for a in arr]
    }

def fromJSON(value):
    return Image.fromarray(np.asarray([[list_unpack(b,size=value['base'],count=4) for b in a] for a in value['image']],dtype='uint8'))

def list_pack(data,size=256):
    return data[0] + size * (list_pack(data[1:],size=size) if len(data) > 1 else 0)

def list_unpack(data,size=256,count=0):
    return [data%size] + (list_unpack(math.floor(data/size),size=size,count=count-1) if data > size or count > 1 else [])
