from PIL import Image
import os
import shutil


export_path = os.path.join("src", "assets", "images")
if os.path.exists(export_path):
    shutil.rmtree(export_path)

target_width = 1000


for dir_path, _, files in os.walk("images"):
    
    for file in files:
        image = Image.open(os.path.join(dir_path, file))
        width, height = image.size
        name = file.split('.',1)[0]

        width_percent = (target_width / float(width))
        new_height = int(float(height) * float(width_percent))
        image = image.resize((target_width, new_height), Image.NEAREST)

        save_dir = os.path.join("src","assets",dir_path)

        os.makedirs(save_dir, exist_ok = True)

        export_file = os.path.join(save_dir, name + ".webp")

        image.save(export_file, "webp", optimize=True)


