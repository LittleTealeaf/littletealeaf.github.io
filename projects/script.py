import json, os, requests

projects_file = open('./assets/projects.json')
projects = json.load(projects_file)
projects_file.close()


token = os.getenv('GITHUB_TOKEN')

def api_github(url):
    if token:
        return requests.get(url,header={'authorization':f'token {token}'}).json()
    else:
        return requests.get(url).json()

def create_page(name,html):
    directory = os.path.join('.',name)
    if not os.path.exists(directory):
        os.mkdir(directory)
        

    path_html = os.path.join(directory,'index.html')
    f = open(path_html,'w')
    f.write(html)
    f.close()


for project in projects:
    api = api_github(project['url'])
    name = api['name']


    with open('./template/template.html') as f:
        create_page(api['name'],("\n".join(f.readlines())).format(
            name = name
            ))
        