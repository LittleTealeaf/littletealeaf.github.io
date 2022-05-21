# My Personal Website

This repository is the home of my personal website! You can view the published website (on github pages) at the link [littletealeaf.github.io](https://littletealeaf.github.io)


## Static Site Generation

This website is created in react, using [Next.js](https://nextjs.org/)'s Static Site Generation feature that compiles the entire website into html, css, and javascript. I use a github action to automate this process by pulling down the main branch, compiling the website into a static html website, and then publishing that website into the `gh-pages` branch (which is used for github pages).
