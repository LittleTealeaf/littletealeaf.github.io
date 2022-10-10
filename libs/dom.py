# Various helper functions for page creation
TARGET_BLANK = "_blank"

def node(
    tag: str = "div",
    amp: str = None,
    classList: list[str] = None,
    children: list[dict] = None,
    href: str = None,
    text: str = None,
    src: str = None,
    alt: str = None,
    target: str = None,
    style: dict = None,
    attributes: dict = None,
    html: str = None,
    other: dict = None,
):
    element = {
        "tag": tag,
        "amp": amp,
        "classList": classList,
        "children": children,
        "href": href,
        "text": text,
        "src": src,
        "alt": alt,
        "target": target,
        "style": style,
        "attributes": attributes,
        "html": html,
    }

    if other:
        for key, value in other.items():
            element[key] = value

    return {key: value for key, value in element.items() if value is not None}


def details(title: str = None, content: str = None):
    return {"component": "details", "title": title, "content": content}


def button(text: str = None, href: str = None, target: str = None):
    return node(text=text, href=href, target=target, other={"component": "button"})

def image(src: str = None, content: dict = None):
  return {
    'component': 'image',
    'content': content,
    'src': src
  }
