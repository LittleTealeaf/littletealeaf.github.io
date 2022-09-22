from io import BytesIO
import json
import os
import shutil
from pathlib import Path
import requests

from PIL import Image

EXPORT_PATH = os.path.join(".", "pages", "resources")


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


def export_image(path: list[str], source):
    reference, absolute = get_paths(path)

    make_parent_directory(absolute)

    img = Image.open(source)
    img.save(absolute)
    return reference

def export_online_image(path: list[str], url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))

    reference, absolute = get_paths(path)

    make_parent_directory(absolute)

    img.save(absolute)
    return reference



def get_paths(path: list[str]):
    return "/".join([".","resources", *path]), "/".join([".", "pages", "resources", *path])


def reset_export():
    if os.path.exists(EXPORT_PATH):
        shutil.rmtree(EXPORT_PATH)
    os.mkdir(EXPORT_PATH)
