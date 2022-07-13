import json
import os
from shutil import rmtree

generated_folder = os.path.join("pages","generated")

if os.path.exists(generated_folder):
    rmtree(generated_folder)

os.mkdir(generated_folder)



def save(name,data):
    with open(os.path.join(generated_folder,name),'w') as f:
        f.write(json.dumps(data))
