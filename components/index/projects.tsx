/* eslint-disable @next/next/no-img-element */
import { Icon } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import projects from 'content/projects';
import {Project} from 'content/projects';
import css from "styles/components/index/projects.module.scss";

const Component = ({}) => (
  <>
    <div id="projects" className={css.component}>
      <h1 className={css.title}>{"Projects"}</h1>
      <div className={css.flex}>
        {projects.map((project, i) => (
          <Card key={i} project={project} />
        ))}
      </div>
    </div>
  </>
);

const Card = ({ project, key }: { project: Project; key: number }) => (
  <>
    <div className={css.card} key={key}>
      <div className={css.card_container}>
        <div className={css.card_content}>
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
