from libs import *

def format_description_segment(segment):
  if segment['type'] == 'image':
    if 'http' in segment['src']:
      segment['src'] = export_online_image(segment['src'])
    else:
      segment['src'] = export_local_image(segment['src'])

    img = Image.open(f'./out/{segment["src"]}')
    segment['width'] = img.width if 'width' not in segment else segment['width']
    segment['height'] = img.height if 'height' not in segment else segment['height']


  return segment

def build_project(data):
  project = {
    'name': data['name'],
    'content': [format_description_segment(segment) for segment in data['content']],
  }

  if 'image' in data:
    project['image'] = export_any_image(data['image'])





  project_page = page(project['name'],project,'project')

  return project_page, {
    'name': project['name'],
    'source': project_page['source'],
    'description': data['description'],
    'image': project['image'],
    'tags': data['tags']
  }

  # if 'images' in project:


  # return page(project['name'],{
  #   "name": project['name'],
  #   "description": project['description'],
  # },'project')

def build():

  projects = []

  # loop through all json files in projects folder
  for file in os.listdir('resources/projects'):
    if file.endswith('.json'):
      with open('resources/projects/' + file) as f:
        projects.append(json.load(f))


  projects = [build_project(project) for project in projects]

  project_pages = [project[0] for project in projects]
  project_snippets = [project[1] for project in projects]


  return page("All Projects",project_snippets,'project-list'), folder("Projects",[
    *project_pages
  ])
