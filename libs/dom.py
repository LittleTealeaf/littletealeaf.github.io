# Various helper functions for page creation


def node(
    tag: str = "div",
    amp: str = None,
    classList: list[str] = None,
    children: list[dict] = None,
    href: str = None,
    src: str = None,
    alt: str = None,
    target: str = None,
    style: dict = None,
    data: dict = None,
):
    element = {
      'tag': tag,
    }

    if amp:
      element['amp'] = amp

    if classList:
      element['classList'] = classList

    if children:
      element['children'] = children

    if href:
      element['href'] = href

    if src:
      element['src'] = src

    if alt:
      element['alt'] = alt

    if target:
      element['target'] = target

    if style:
      element['style'] = style

    if data:
      element['data'] = data

    return element
