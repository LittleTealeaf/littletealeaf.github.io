import numpy as np
import util_assets as assets
import os
import glob
import requests
import random
from util_assets import Asset
from PIL import Image, ImageDraw, ImageFilter
from io import BytesIO
from list_filetypes import *

DIR = ['images']


def ref(url, dir=DIR, type=PNG, circular=False):
    print(f'IMG: {url}')
    img = Image.open(BytesIO(requests.get(url).content)).convert('RGBA')

    if circular:
        h, w = img.size

        alpha = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(alpha)
        draw.ellipse((0, 0, h, w), fill=255)

        img.putalpha(alpha.filter(ImageFilter.GaussianBlur(4)))

    asset = Asset(dir=(dir if dir else DIR), type=type, seed=hash_image(img))
    img.save(asset.path)
    return asset.ref


def hash_image(img):
    image = img.resize((10, 10), Image.ANTIALIAS)
    image = image.convert("L")
    pixel_data = list(image.getdata())
    avg_pixel = sum(pixel_data) / len(pixel_data)
    bits = "".join(['1' if (px >= avg_pixel) else '0' for px in pixel_data])
    hex_representation = str(hex(int(bits, 2)))[2:][::-1].upper()
    return hex_representation
