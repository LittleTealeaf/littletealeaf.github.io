from io import BytesIO
import json
from PIL import Image, ImageDraw, ImageFilter
import requests
from libs.cachelib import Cache
import numpy as np

EXPIRES_DEFAULT = 24
EXPIRES_MAX = 336
EXPIRES_MIN = 0
EXPIRES_STEP = 12


cache = Cache('images')


def get(url: str, circular: bool = False, expires=EXPIRES_DEFAULT, expires_min=EXPIRES_MIN, expires_max=EXPIRES_MAX, expires_step=EXPIRES_STEP):
    key_dict = {
        'circular': circular
    }
    key = f"{url}{key_dict}"

    cached = cache.get(key)
    if cached != None:
        return Image.fromarray(np.array(cached,dtype='uint8'))

    print(f"IMAGE: {key}")
    img = Image.open(BytesIO(requests.get(url).content)).convert('RGBA')

    if circular:
        h, w = img.size

        alpha = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(alpha)
        draw.ellipse((0, 0, h, w), fill=255)

        img.putalpha(alpha.filter(ImageFilter.GaussianBlur(4)))

    cache.set(key, np.array(img).tolist(), expires=expires,
              expires_min=expires_min, expires_max=expires_max, expires_step=expires_step)
    return img
