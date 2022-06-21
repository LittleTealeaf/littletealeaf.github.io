/* eslint-disable @next/next/no-img-element */
import { Icon } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import projects, { Project } from "content/projects";
import css from "styles/components/index/projects.module.scss";
import { RenderNotNull } from "components/utils";

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
          {project.description.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {RenderNotNull(project.labels, () => (
            <div className={css.labels_container}>
              {project.labels.map((label, key) => (
                <div key={key}>{label}</div>
              ))}
            </div>
          ))}
          {RenderNotNull(project.links, () => (
            <ul className={css.links}>
              {RenderNotNull(project.links.github, () => (
                <IconLink component={GitHubIcon} href={project.links.github} />
              ))}
              {RenderNotNull(project.links.website, () => (
                <IconLink component={LanguageIcon} href={project.links.website} />
              ))}
              {RenderNotNull(project.links.report, () => (
                <IconLink component={ArticleIcon} href={project.links.report} />
              ))}
            </ul>
          ))}
        </div>
        {RenderNotNull(project.image, () => (
          <img src={project.image} alt={project.name} />
        ))}
      </div>
    </div>
  </>
);

const IconLink = ({ component, href }) => (
  <li>
    <a target="_blank" href={href} rel="noreferrer">
      <Icon component={component} />
    </a>
  </li>
);

export default Component;
