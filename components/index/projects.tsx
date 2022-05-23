/* eslint-disable @next/next/no-img-element */
import { Icon } from "@mui/material";
import { BgImg } from "libs/utils";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';

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
    description: "A Chat App created using GitHub to sign in. Created for my SER-210 Final Project",
    github: "https://github.com/LittleTealeaf/SER-210-Final",
  },
  {
    image: require("assets/images/projects/ser225project.png"),
    name: "SER-225 Platform Game",
    description: "A platformer game created for SER-225",
  },
  {
    name: "Java Markdown",
    description: "A Markdown Writer library for Java",
  },{
    name: "Connect-4 Evaluator",
    description: "A simple neural network that evaluated the current state of a connect-4 game",
    github: "https://github.com/LittleTealeaf/DS-210-Final",
    report: "https://github.com/LittleTealeaf/DS-210-Final/blob/main/report/report.pdf"
  },{
    name: "littletealeaf.github.io",
    description: "The very website you're looking at",
    github: "https://github.com/LittleTealeaf/littletealeaf.github.io",
    website: "https://littletealeaf.github.io/"
  }
];

const Component = ({}) => (
  <>
    <div className={scss.content}>
      <h1 className={scss.titlecontainer}>{"Projects"}</h1>
      <div className={scss.projectflex}>
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
      <div className={scss.cardcontent}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul>
          <LinkIf component={GitHubIcon} href={project.github} />
          <LinkIf component={ArticleIcon} href={project.report} />
          <LinkIf component={LanguageIcon} href={project.website} />
        </ul>
      </div>
      {project.image != null ? <img src={project.image} alt={project.name} /> : <></>}
    </div>
  </>
);

const LinkIf = ({ component, href }) => href == null ? (
  <></>
) : (
  <li>
    <a href={href}>
      <Icon component={component} />
    </a>
  </li>
);

export default Component;
