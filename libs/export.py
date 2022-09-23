from io import BytesIO
import json
import os
import shutil
from pathlib import Path
import requests

from PIL import Image

EXPORT_PATH = os.path.join(".", "out", "resources")

IMAGE_COUNT = 0
IMAGE_CACHE = {}


def export_json(path: list[str], contents: any):
    return f'{export_file(path, json.dumps(contents), extension="json")}.json'


def export_file(path: list[str], contents: str, extension="txt"):
    reference, absolute = get_paths(path)

    make_parent_directory(absolute)

    with open(absolute + f".{extension}", "w") as f:
        f.write(contents)
    return reference


def make_parent_directory(path: list[str]):
    parent_directory = Path(os.path.join(path)).parent.absolute()
    if not os.path.exists(parent_directory):
        os.makedirs(parent_directory)


# Deprecated
def export_imexport_some_imageage(path: list[str], source):
    reference, absolute = get_paths(path)

    make_parent_directory(absolute)

    img = Image.open(source)
    img.save(absolute)
    return reference

def export_online_image(url):
    if url in IMAGE_CACHE:
        return IMAGE_CACHE[url]
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    ref = export_image(img)
    IMAGE_CACHE[url] = ref
    return ref

def export_local_image(path: str):
    if path in IMAGE_CACHE:
        return IMAGE_CACHE[path]
    img = Image.open(path)
    ref = export_image(img)
    IMAGE_CACHE[path] = ref
    return ref

def export_image(img):
    global IMAGE_COUNT
    reference, absolute = get_paths(['images',f'{IMAGE_COUNT}.webp'])
    IMAGE_COUNT += 1
    make_parent_directory(absolute)
    img.save(absolute)
    return reference



def get_paths(path: list[str]):
    return "/".join([".","resources", *path]), "/".join([".", "pages", "resources", *path])


def reset_export():
    if os.path.exists(EXPORT_PATH):
        shutil.rmtree(EXPORT_PATH)
    os.mkdir(EXPORT_PATH)
