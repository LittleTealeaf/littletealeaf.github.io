import libs.github as Github
import libs.generated as gen
import json

gen.initialize()

gen.refjson(Github.getAPIList('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/commits'),'api','test','littletealeaf.github.io.json')
gen.refjson(Github.getAPIList('https://api.github.com/repos/LittleTealeaf/paceManager/commits'),'api','test','paceManager.json')