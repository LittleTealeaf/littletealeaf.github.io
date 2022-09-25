from libs import *
from pages import *

reset_export()

all_projects, projects = projects.build()

export_tree([
    home.build(),
    about_me.build(),
    all_projects,
    projects
])
