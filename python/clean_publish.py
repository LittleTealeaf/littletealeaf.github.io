import os
import numpy as np

# Cleans the repository of any unneeded files before it finishes

filterList = ['template.html']
deleteDirs = ['./python','./templates']

removeList = []

def checkFile(root,filename):
    for dir in deleteDirs:
        if dir in root:
            return True
    return filename in filterList

for root, dirnames, filenames in os.walk('.'):
    for filename in filenames:
        if checkFile(root,filename):
            removeList.append(os.path.join(root,filename))


for file in removeList:
    os.remove(file)