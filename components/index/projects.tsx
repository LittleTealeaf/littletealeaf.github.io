/* eslint-disable @next/next/no-img-element */
import { Icon } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import projects, { Links } from "content/projects";
import { Project } from "content/projects";
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
          {project.description.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <LabelsIf labels={project.labels} />
          <LinksIf links={project.links} />
        </div>
        {project.image != null ? <img src={project.image} alt={project.name} /> : <></>}
      </div>
    </div>
  </>
);

const LabelsIf = ({ labels }: { labels: Array<string> }) =>
  labels == null ? (
    <></>
  ) : (
    <>
      <div className={css.labels_container}>
        {labels.map((label, key) => (
          <div key={key}>{label}</div>
        ))}
      </div>
    </>
  );

const LinksIf = ({ links }: { links: null | Links }) =>
  links == null ? (
    <></>
  ) : (
    <ul>
      <IconIf component={GitHubIcon} href={links.github} />
      <IconIf component={LanguageIcon} href={links.website} />
      <IconIf component={ArticleIcon} href={links.report} />
    </ul>
  );

const IconIf = ({ component, href }) =>
  href == null ? (
    <></>
  ) : (
    <li>
      <a target="_blank" href={href} rel="noreferrer">
        <Icon component={component} />
      </a>
    </li>
  );

export default Component;
