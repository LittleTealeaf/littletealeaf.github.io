from github import getRequest
from generated import save
from resources import getJson, referenceImage

user = getRequest("https://api.github.com/users/LittleTealeaf").json()


save("neofetch.json", {
    "repo_count": user['public_repos']
})

projects = getJson("projects.json")

for project in projects:
    if 'image' in project:
        project['image'] = referenceImage(project['image'],project['name'].replace(' ','_') + ".png")



save("projects.json",projects)
