import os

# Recursively finds all directories that have the 'script.py' and prints them


for root, dirnames, filenames in os.walk('.'):
    if 'script.py' in filenames:
        print(root)