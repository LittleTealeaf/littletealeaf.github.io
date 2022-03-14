import os, glob, numpy as np, requests, random
from PIL import Image, ImageDraw, ImageFilter
from io import BytesIO

def image_format_circular(img):
    h,w = img.size

    alpha = Image.new('L',img.size,0)
    draw = ImageDraw.Draw(alpha)
    draw.ellipse((0,0,h,w),fill=255)

    img.putalpha(alpha.filter(ImageFilter.GaussianBlur(4)))

    return img

def image_read(path):
    return Image.open(path)

def image_src(url):
    return Image.open(BytesIO(requests.get(url).content))

def image_format(image,attributes={}):
    img = image
    if 'circular' in attributes and attributes['circular']:
        img = image_format_circular(img)
    
    size = img.size
    if 'width' in attributes:
        size[0] = attributes['width']
    if 'height' in attributes:
        size[1] = attributes['height']
    img = img.resize(size)
    return img