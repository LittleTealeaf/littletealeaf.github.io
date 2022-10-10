# Various helper functions for page creation


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
  other: dict = None
):
  element = {
    'tag': tag,
    'amp': amp,
    'classList': classList,
    'children': children,
    'href': href,
    'text': text,
    'src': src,
    'alt': alt,
    'target': target,
    'style': style,
    'attributes': attributes,
    'html': html
  }

  if other:
    for key,value in other:
      element[key] = value

  return {
    key: value for key, value in element.items() if value is not None
  }

def details(title: str = None, content: str = None):
  return {
    'component': 'details',
    'title': title,
    'content': content
  }
