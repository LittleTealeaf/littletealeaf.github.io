# littletealeaf.github.io
[![CodeQL](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml) [![Deploy Website](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/deploy.yml)

My personal website!

## How I build stuff ;)

Firstly, I am totally doing stuff wrong because this is one of my first website development projects, so the way I ordered files is funky  

However, the astute set of you might notice the lack of index.html! And the fact that index.html is in the .gitignore! Yes, yes I did that.  

One of the reasons I do this is because the index.html is actually auto-generated whenever the build script is run. This is because I wanted to make developing a lot easier, allowing me to buld the header, footer, project template, and more separately, and applied to the pages that I want through the use of a python script!  

Basically, me no have enough experience to know right way to do this so I'm going to do the crazy overcomplicated way I do it