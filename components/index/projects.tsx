/* eslint-disable @next/next/no-img-element */
import { Icon } from "@mui/material";
import { BgImg } from "libs/utils";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";

import scss from "styles/components/index/projects.module.scss";

type Project = {
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
  },{
    image: require('assets/images/projects/gdd140datavisualization.png'),
    name: "p5.js Data Visualization",
    description: "Using a combination of p5.js and python (jupyter notebook), I compiled and visualized data from the 2021 stack-overflow survey. The visualization describes what languages programmers currently use versus what they want to use.",
    github: "https://github.com/LittleTealeaf/GDD-140-Project-6.2",
    website: "https://littletealeaf.github.io/GDD-140-Project-6.2",
    report: "https://github.com/LittleTealeaf/GDD-140-Project-6.2/blob/main/python/notebook.ipynb"
  },
  {
    name: "Java Markdown",
    description: "A Markdown Writer library for Java",
    github: "https://github.com/LittleTealeaf/JavaMarkdown"
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

const Component = ({}) => (
  <>
    <div id="projects" className={scss.component}>
      <h1 className={scss.title}>{"Projects"}</h1>
      <div className={scss.flex}>
        {projects.map((project, i) => (
          <Card key={i} project={project} />
        ))}
      </div>
    </div>
  </>
);

const Card = ({ project }: { project: Project; key: number }) => (
  <>
    <div className={scss.card}>
      <div className={scss.card_container}>
        <div className={scss.card_content}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <ul>
            <IconIf component={GitHubIcon} href={project.github} />
            <IconIf component={LanguageIcon} href={project.website} />
            <IconIf component={ArticleIcon} href={project.report} />
          </ul>
        </div>
        {project.image != null ? <img src={project.image} alt={project.name} /> : <></>}
      </div>
    </div>
  </>
);

const IconIf = ({ component, href }) =>
  href == null ? (
    <></>
  ) : (
    <li>
      <a href={href}>
        <Icon component={component} />
      </a>
    </li>
  );

export default Component;
