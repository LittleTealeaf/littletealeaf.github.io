# littletealeaf.github.io

[![Build Website](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/build.yml/badge.svg?branch=main&event=push)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/build.yml) [![CodeQL](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml)

Hi! Welcome to the repository that builds and deploys [littletealeaf.github.io](https://littletealeaf.github.io)

It's currnetly in development, so... Yea!

`Tealeaf Signing Off!`

## Dev Thoughts

Maybe this is the chance to convert completely to javascript/typescript.

Remove the need for python scripts

something like

- Create separate javascript scripts that manage stuff
- Javascript Libraries to manage rendering and stuff. Split up libraries between "precompile" or "compile" paths

Or maybe not...

First, see if I can figure out a way to read a markdown with the tags infront like using frontmatter
Second, see if I can 

## Project Layout

> TODO: render project layout

## Building the Project

Once you've downloaded the repo, use the following commands to install all necessary repositories

```sh
python -m pip install -r python/requirements.txt
npm install
```

Afterwards, run the following command to generate the back-end code

```sh
python python/build.py
```

Once this is done, you can run the following script to run the dev environment

```sh
npm run dev
```

And the following to compile into the out directory

```sh
npm run compile
```
