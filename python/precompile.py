import libs.github as Github
import libs.generated as gen
import libs.config as conf
import json

gen.initialize()

index = {}

index['projects'] = conf.getFiles('projects')
index['blogs'] = conf.getFiles('blogs')


gen.refjson(index,'index.json')