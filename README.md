# littletealeaf.github.io
[![Build Website](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/build.yml/badge.svg)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/build.yml) [![CodeQL](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/LittleTealeaf/littletealeaf.github.io/actions/workflows/codeql.yml)


Hi! Welcome to the repository that builds and hosts my own personal website using github actions and github pages!

## Repository Structure
This website isn't just the repository. Actually, the website itself isn't stored as itself in this repository. Instead, this repository has scripts and files used to compile the website into a `build/` directory (which, for simplicity, we have listed in the [`.gitignore`](./.gitignore))

This is because I wanted to make things modular, maybe some parts of the website will update every day or so, maybe include a metrics section. Who knows!

The build scripts are the ones responsible for making this possible. They compile and build the website into the `build/` directory, which is used to publish. I use a combination of bash scripting and python to achieve the production. The bash script deals with installing certain python modules, cleaning the build directory (for uses such as in development where the `build/` directory may exist).

### Repository Structure

| Directory | Purpose |
| :--- | :--- |
| [`javascript/`](./javascript/) | Contains all the javascript files used within the website. This directory is copied into the `build/` directory after the build phase|
| [`python/`](./python/) | Contains all the python scripts used in deploying the website. All python scripts are executed from the root directory of the repository for simplicity purposes (from the [`build.sh`](./build.sh) script) |
| [`resources/`](./resources/) | Contains any misc resource files that are needed within the project. Files automatically generated during build are created under `resources/generated/`, which is listed in [`.gitignore`](./.gitignore). This directory is copied into the `build/` directory after the build phase.
| [`source/`](./source/) | Contains the website source structure. This contains `index.html` objects and other files related to how the actual website should be built. Files in this directory may contain `{template}` placeholders, which are replaced with the related contents listed in [`templates/`](./templates/).
| [`styles/`](./styles/) | Cascading Style Sheets used within the project.  This directory is copied into the `build/` directory after the build phase.
| [`templates/`](./templates/) | Contains templates for use in building the [`source/`](./source/) directory into `build/`. placeholder keys simply indicate the path within the `templates` directory to find the template that should be used there. <!-- Add note here about templates being able to use other templates maybe?-->

### Build Outline

## Development Notes
Basically, notes that write just because I need somewhere to store them..

https://colorhunt.co/palette/f7f6defa7e0a8f0e0e530c0c