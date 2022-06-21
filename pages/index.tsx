import { Avatar, Icon } from "@mui/material";
import classNames from "classnames";
import { AboutMeContent, Labels, Links, ProjectList } from "content/index.content";
import { ProjectType } from "content/index.types";
import { BackgroundImage } from "libs/utils";
import Head from "next/head";
import css from "styles/pages/index.module.scss";

const TitleScreen = ({}) => (
  <div
    className={css.title}
    style={{
      background: BackgroundImage(require("assets/images/index/home.jpg"), "no-repeat top center"),
      WebkitBackgroundSize: "cover !important",
    }}
  >
    <div className={css.content}>
      {"Thomas Kwashnak"}
      <hr />
      <div className={css.labels}>
        {Labels.map((label, index) => (
          <p key={index}>{label}</p>
        ))}
      </div>
      <p>{"Student at Quinnipiac University"}</p>
      <ul>
        {Links.map((item) => (
          <li key={item.key}>
            <a target="_blank" href={item.href} className={css.icon} rel="noreferrer">
              <Icon component={item.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const AboutMe = ({}) => (
  <div className={css.aboutme}>
    <div className={css.container}>
      <div className={css.content}>
        <h2>{"About Me"}</h2>
        {AboutMeContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className={classNames("square", css.avatar)}>
        <Avatar alt="An image of me" src={require("assets/images/index/aboutme.jpg")} sx={{ width: "100%", height: "100%", maxWidth: "300px", maxHeight: "300px" }} />
      </div>
    </div>
  </div>
);

const Projects = ({}) => (
  <div className={css.projects}>
    <h1 className={css.title}>{"Projects"}</h1>
    <div className={css.flex}>
      {ProjectList.map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, key }: { project: ProjectType; key: number }) => <div className={css.card} key={key}></div>;

export default function Content({}) {
  return (
    <>
      <Head>
        <title>Thomas Kwashnak</title>
      </Head>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${require("assets/images/index/projects.png")})`,
          backgroundSize: "150%",
        }}
      >
        <TitleScreen />
        <AboutMe />
        <Projects />
      </div>
    </>
  );
}
