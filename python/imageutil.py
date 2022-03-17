import os, glob, numpy as np, requests, random
from PIL import Image, ImageDraw, ImageFilter
from io import BytesIO
from assetutil import *

def ref_image(url,asset_path=IMAGES,type=PNG,circular=False):
    print(f"IMAGE: {url}")
    img = Image.open(BytesIO(requests.get(url).content)).convert('RGBA')

    if circular:
        h,w = img.size

        alpha = Image.new('L',img.size,0)
        draw = ImageDraw.Draw(alpha)
        draw.ellipse((0,0,h,w),fill=255)

        img.putalpha(alpha.filter(ImageFilter.GaussianBlur(4)))
    
    
    asset = Asset(path=asset_path,type=type,seed=hash_image(img))
    img.save(asset.path)

    return asset.ref


def hash_image(img):
    image = img.resize((10,10),Image.ANTIALIAS)
    image = image.convert("L")
    pixel_data = list(image.getdata())
    avg_pixel = sum(pixel_data) / len(pixel_data)
    bits = "".join(['1' if (px >= avg_pixel) else '0' for px in pixel_data])
    hex_representation = str(hex(int(bits, 2)))[2:][::-1].upper()
    return hex_representation


# def image_format_circular(img):
#     h,w = img.size

#     alpha = Image.new('L',img.size,0)
#     draw = ImageDraw.Draw(alpha)
#     draw.ellipse((0,0,h,w),fill=255)

#     img.putalpha(alpha.filter(ImageFilter.GaussianBlur(4)))

#     return img

# def image_read(path):
#     print(f'Loading image from {path}')
#     return Image.open(path)

# def image_src(url):
#     print(f'Loading image from {url}')
#     return Image.open(BytesIO(requests.get(url).content))

# def image_format(image,attributes={}):
#     img = image.convert('RGBA')
#     if 'circular' in attributes and attributes['circular']:
#         img = image_format_circular(img)
    
#     size = img.size
#     if 'width' in attributes:
#         size[0] = attributes['width']
#     if 'height' in attributes:
#         size[1] = attributes['height']
#     img = img.resize(size)
#     return img
