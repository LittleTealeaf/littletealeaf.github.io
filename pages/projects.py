from libs import *


def format_content_segment(segment):
    if segment["type"] == "image":
        segment["src"] = export_any_image(segment["src"])

        img = Image.open(f'./out/{segment["src"]}')
        if "width" not in segment:
            segment["width"] = img.width
        if "height" not in segment:
            segment["height"] = img.height

    return segment


def build_project(project):

    # project["content"] = [
    #     format_content_segment(segment) for segment in project["content"]
    # ]
    project['content'] = format_dom(project['content'])

    if "thumbnail" in project:
        project["thumbnail"] = export_any_image(project["thumbnail"])

    project_page = page(project["name"], project, render="project")

    return (
        project_page,
        {
            "name": project["name"],
            "src": project_page["src"],
            "description": project["description"],
            "thumbnail": project["thumbnail"],
            "tags": project["tags"],
        },
    )


def build():
    project_json = []
    for file in os.listdir("resources/projects"):
        if file.endswith(".json"):
            with open(f"resources/projects/{file}") as f:
                project_json.append(json.load(f))

    project_pages, project_info = zip(
        *[build_project(project) for project in project_json]
    )

    project_pages = list(project_pages)
    project_info = list(project_info)

    return page(
        "Projects",
        project_info,
        render="project_list",
        children=project_pages,
        id="projects",
    )
