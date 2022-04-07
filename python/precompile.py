from pathlib import Path
import libs.github as Github
from libs.generated import Gen, gen_initialize
import libs.config as conf
import frontmatter
import markdown
import os
import json

MARKDOWN_EXTENSIONS = ['tables','fenced_code']

gen_initialize()

index = {}

index['pages'] = {}
projects = {}
for project_path in conf.getFiles('projects'):
    project = conf.getJSON(*project_path)

    project['github']['api'] = Github.getAPI(
        f"https://api.github.com/repos/{project['github']['repo']}")
    project['github']['languages'] = Github.getAPI(
        project['github']['api']['languages_url'])
    project['github']['contributors'] = Github.getAPIList(
        project['github']['api']['contributors_url'])
    project['github']['tags'] = Github.getAPIList(project['github']['api']['tags_url'])
    project['github']['events'] = Github.getAPIList(project['github']['api']['events_url'],count=200,expires=6)

    projects[Path(project_path[-1]).stem] = Gen('pages',
                                                'projects', project_path[-1]).ref_json(project)
index['pages']['projects'] = Gen('pageindexes', 'projects').ref_json(projects)


# Blogs
blogs = {}
for blog_path in conf.getFiles('blogs'):
    md = None
    post = frontmatter.load(conf.getPath(*blog_path)).to_dict()
    post['content'] = markdown.markdown(post['content'],extensions=MARKDOWN_EXTENSIONS)
    blogs[Path(blog_path[-1]).stem] = Gen('pages','blogs',blog_path[-1]).ref_json(post)
index['pages']['blogs'] = Gen('pageindexes','blogs').ref_json(blogs)

index['analytics'] = Gen('analytics').ref_json({
    'github': {
        'api': Github.getAnalytics(),
        'cache': Github.getAPI('https://api.github.com/repos/LittleTealeaf/littletealeaf.github.io/actions/cache/usage', expires=-1),
        'rate_limits': Github.getAPI('https://api.github.com/rate_limit', expires=-1)
    }
})

Gen('index').ref_json(index)
