import json
import os
import shutil
import genutil as gen
import configutil as conf


index = {
    "pages": {}
}

# Projects
index['pages']['projects'] = {}

for dir,dirs,files in os.walk(os.path.join(conf.PATH,'projects')):
    for file in files:
        slug = os.path.splitext(file)[0]
        with open(os.path.join(dir,file)) as f:
            index['pages']['projects'][slug] = gen.ref(json.dumps(json.load(f)),'pages','projects',f'{slug}.json')

gen.ref(json.dumps(index),'index.json')