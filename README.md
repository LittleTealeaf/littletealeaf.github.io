# littletealeaf.github.io

[![Build Website](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/build.yml/badge.svg?branch=main&event=push)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/build.yml) [![CodeQL](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml)

Hi! Welcome to the repository that builds and deploys [littletealeaf.github.io](https://littletealeaf.github.io)

It's currnetly in development, so... Yea!

`Tealeaf Signing Off!`

## Project Layout

> TODO: render project layout

## Building the Project

Once you've downloaded the repo, use the following commands to install all necessary repositories

```sh
python -m pip instal -r python/requirements.txt
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
