export type Project = {
  image?: string;
  name: string;
  description: Array<string>;
  github?: GitHubRepo;
  links?: Links;
  labels?: Array<string>;
};

export type Links = {
  github?: string;
  website?: string;
  report?: string;
};

export type GitHubRepo = {
  owner: string;
  repo: string;
};

export const GitHubRepoToString = (repo: GitHubRepo): string => `${repo.owner}/${repo.repo}`

const projects: Array<Project> = [
  {
    image: require("assets/images/projects/gdd140datavisualization.png"),
    name: "p5.js Data Visualization",
    description: [
      "A visualization analyzing data pulled from the 2021 Stack Overflow survey data. This visual work depicts the relationship of languages programmers indicated they currently worked with versus what they wanted to work with.",
      "I used python in a jupyter notebook to compile the data, and imported that into p5.js, where I created this interactive graphic.",
    ],
    links: {
      website: "https://littletealeaf.github.io/GDD-140-Project-6.2",
      report: "https://github.com/LittleTealeaf/GDD-140-Project-6.2/blob/main/python/notebook.ipynb",
    },
    github: {
      owner: "LittleTealeaf",
      repo: "GDD-140-Project-6.2"
    },
    labels: [
      "Jupyter","Python","Javascript","p5.js","Data Science"
    ]
  },
  {
    name: "Connect-4 Evaluator",
    description: [
      "In my intro to data science course, I worked on a project learning the stoastic steepest descent algorithm in the context of a neural network.",
      " Using a dataset of states of Connect-4 and their outcome, I attempted to train a naive neural network to predict the winner of a given board.",
    ],
    links: {
      report: "https://github.com/LittleTealeaf/DS-210-Final/blob/main/report/report.pdf",
    },
    github: {
      owner: "LittleTealeaf",
      repo: "DS-210-Final"
    },
    labels: [
      "Python","Data Science","Neural Networks"
    ]
  },
  {
    name: "Java Markdown",
    description: [
      "One of my more free-time projects. I'm building a simple library that streamlines writing markdown-formatted strings in Java. This makes it simple for developers to use for programs that interact with a markdown-supporting interface",
    ],
    github: {
      owner: "LittleTealeaf",
      repo: "JavaMarkdown"
    }
  },
  {
    image: require("assets/images/projects/ser225project.png"),
    name: "SER-225 Platform Game",
    description: [
      "A legacy group project I worked during the Fall 2021 Semester. My group was given a previously constructed game, and instructed to learn it and continue development. I acted as the groups scrum master, managing pull requests into the production branch",
      "I focused most of my efforts on reconstructing various core functionalities that needed to be changed to support our ideas. This included revamping the menu system, level loading system, and more.",
    ],
    github: {
      owner: "LittleTealeaf",
      repo: "SER-225-Team-A2"
    },
    labels: [
      "Java","AWT","Agile","Scrum"
    ]
  },

{
    image: require("assets/images/projects/ser210final.png"),
    name: "GitHub Chat App",
    description: [
      "A chat app I created during an Android Development class at Quinnipiac. I worked alone on this project, instead of the typical group of 3.",
      "This app allows users to communicate in chat rooms connected to GitHub repositories they participate in. It only requires that the user signs in with their GitHub account.",
    ],
    github: {
      owner: "LittleTealeaf",
      repo: "SER-210-Final",
    },
    labels: [
      "Java","Android Studio","GitHub","REST API"
    ]
  },
  {
    name: "littletealeaf.github.io",
    description: ["The website you are looking at is created using Next.js to render as a static website, and then published using GitHub Pages"],
    links: {
      website: "#home",
    },
    github: {
      owner: "LittleTealeaf",
      repo: "littletealeaf.github.io"
    }
  },
];

projects.forEach((item) => {
  if (item.github != null) {
    if (item.links == null) {
      item.links = {};
    }
    item.links.github = `https://github.com/${item.github.owner}/${item.github.repo}`;
  }
});

export default projects;
