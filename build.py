from libs import *
from pages import *

reset_export()

export_tree(
    [
        home.build(),
        about_me.build(),
        projects.build(),
        resume.build(),
        contact.build(),
    ]
)
