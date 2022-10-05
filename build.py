from libs import *
from pages import *

reset_export()

# TODO add stats

export_tree(
    [
        home.build(),
        about_me.build(),
        stats.build(),
        projects.build(),
        resume.build(),
        contact.build(),
    ]
)
