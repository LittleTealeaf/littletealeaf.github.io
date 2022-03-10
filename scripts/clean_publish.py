import os

# Cleans the repository of any unneeded files before it finishes

removeList = []

for root, dirnames, filenames in os.walk('.'):
    for filename in filenames:
        if filename in ['template.html', 'footer.html', 'header.html']:
            removeList.append(os.path.join(root,filename))

print(removeList)