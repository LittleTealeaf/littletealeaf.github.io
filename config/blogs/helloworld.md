---
title: Hello World
---

Hello world! This blog is simply a quick blog that I'm using to test multiple features that are available for creating blogs. I'm using the [markdown](https://pypi.org/project/Markdown/) Python extension in order to convert the markdown to HTML, however I feel like I should use the javascript method. Perhaps I could make a pre-compile javascript method that manages with those features. This is all just things I could think of that might happen.

So, for a test, here is a table:

| Header A | Header B | Header C |
| :--: | --: | :-- |
| This should be centered | This should be right aligned | This should be left aligned |
| Hi | Hello | Py |
| 0.10 | 12412 | **BOLD** |
| *Italics* | ~~something~~ | Oh! that's cool |

Here is a code snippet to try out

```javascript
export async function getStaticPaths() {
    return {
        paths: Object.keys(getGenerated(index.pages.blogs)).map((slug) => ({
            params: {
                id: slug
            }
        })),
        fallback: false
    }
}
```

And here is some python too

```python
if 'RUN_NUMBER' not in os.environ or int(os.environ['RUN_NUMBER']) % 100 == 0:
    print("Cleaning Caches")
    caches = [
        os.path.join('.', 'cache')
    ]

    for cache in caches:
        shutil.rmtree(cache)
        os.makedirs(cache, exist_ok=True)
else:
    print("Skipping Cache Clearing")
```

The following lines should be a quote:

> And I said: "I am a bird, of course!"

And now I can't think of other features that I should test
