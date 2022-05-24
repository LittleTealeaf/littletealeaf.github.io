export type Project = {
  image?: string;
  name: string;
  description: string;
  github?: string;
  report?: string;
  website?: string;
};

const projects: Array<Project> = [
  {
    image: require("assets/images/projects/ser210final.png"),
    name: "GitHub Chat App",
    description:
      "A Chat App created as a final project for SER-210. The app provides a simple chat room that you can join for any github repository. The app uses your GitHub account to authenticate and sign in.",
    github: "https://github.com/LittleTealeaf/SER-210-Final",
  },
  {
    image: require("assets/images/projects/ser225project.png"),
    name: "SER-225 Platform Game",
    description:
      "A platformer game created for SER-225. At the beginning of the semester, my group was given a project that previous groups have worked on, and told to continue development. I spent my efforts rebuilding the menu and other core libraries to improve their usability and efficiency.",
    github: "https://github.com/LittleTealeaf/SER-225-Team-A2",
  },
  {
    image: require("assets/images/projects/gdd140datavisualization.png"),
    name: "p5.js Data Visualization",
    description:
      "Using a combination of p5.js and python (jupyter notebook), I compiled and visualized data from the 2021 stack-overflow survey. The visualization describes what languages programmers currently use versus what they want to use.",
    github: "https://github.com/LittleTealeaf/GDD-140-Project-6.2",
    website: "https://littletealeaf.github.io/GDD-140-Project-6.2",
    report: "https://github.com/LittleTealeaf/GDD-140-Project-6.2/blob/main/python/notebook.ipynb",
  },
  {
    name: "Java Markdown",
    description: "A Markdown Writer library for Java",
    github: "https://github.com/LittleTealeaf/JavaMarkdown",
  },
  {
    name: "Connect-4 Evaluator",
    description: "A simple neural network that evaluated the current state of a connect-4 game",
    github: "https://github.com/LittleTealeaf/DS-210-Final",
    report: "https://github.com/LittleTealeaf/DS-210-Final/blob/main/report/report.pdf",
  },
  {
    name: "littletealeaf.github.io",
    description: "The very website you're looking at",
    github: "https://github.com/LittleTealeaf/littletealeaf.github.io",
    website: "#home",
  },
];

export default projects;
