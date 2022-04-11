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

    try:
        cached = cache.get(key)
        if cached != None:
            print(f'CACHED IMAGE: {key}')
            return Image.fromarray(np.array(cached,dtype='uint8'))
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

    cache.set(key, np.array(img).tolist(), expires=expires,
              expires_min=expires_min, expires_max=expires_max, expires_step=expires_step, priority=priority)
    return img
