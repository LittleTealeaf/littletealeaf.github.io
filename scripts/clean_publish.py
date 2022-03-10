import os

# Cleans the repository of any unneeded files before it finishes

filterList = ['template.html']

removeList = []

for root, dirnames, filenames in os.walk('.'):
    for filename in filenames:
        if filename in filterList or './templates/' in root:
            removeList.append(os.path.join(root,filename))


for file in removeList:
    os.remove(file)