from io import BytesIO
import json
import os
import shutil
from pathlib import Path
from sysconfig import get_path
import requests

from PIL import Image

EXPORT_PATH = os.path.join(".", "pages", "resources")


def export_json(path: list[str], contents: any):
    return export_file(path, json.dumps(contents), extension="json")


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

# <<<<<<< HEAD
def export_online_image(path: list[str], url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))

    reference, absolute = get_paths(path)

    make_parent_directory(absolute)

    img.save(absolute)
# =======
# def export_json(object,*path):
#     reference,absolute = export_path(*path)
#     make_directory(absolute)
#     with open(absolute,'w') as file:
#         file.write(json.dumps(object, indent=4))
# >>>>>>> cb160ee5f190ee81f22fa7e20b1a89eed3a06d03
    return reference



def get_paths(path: list[str]):
    return "/".join(["resources", *path]), "/".join([".", "pages", "resources", *path])


def reset_export():
    if os.path.exists(EXPORT_PATH):
        shutil.rmtree(EXPORT_PATH)
    os.mkdir(EXPORT_PATH)
