import os
import shutil
import genutil as gen


# index = {}

# index['projects'] = {}

# for dir,dirs,files in os.walk(os.path.join('config','projects')):
#     for file in files:
#         file_path = os.path.join(dir,file)
#         slug = os.path.splitext(file)[0]
#         index['projects'][slug] = gen.ref_json(gen.load_json(file_path),'projects', slug)

# gen.ref_json(index,'index')