/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Icon } from "@mui/material";
import scss from "styles/index.module.scss";
import Spacer from "components/spacer";
import classNames from "classnames";

export const config = {
  unstable_runtimeJS: false,
};

const IconLink = ({ component, href }) => (
  <a href={href} className={scss.iconholder}>
    <Icon component={component} />
  </a>
);

const Home = ({ content }: { content: { name: string; labels: string[]; position: string } }) => (
  <div
    className={scss.home}
    style={{
      background: `url(${require("assets/images/index/home.jpg")}) no-repeat top center`,
      WebkitBackgroundSize: "cover !important",
    }}
  >
    <div className={scss.content}>
      {content.name}
      <hr />
      <div className={scss.labels}>
        {content.labels.map((label, index) => (
          <p key={index}>{label}</p>
        ))}
      </div>

      <p>{content.position}</p>
      <ul>
        {[
          <IconLink key={"github"} component={GitHubIcon} href={"https://www.github.com/LittleTealeaf"} />,
          <IconLink key={"linkedin"} component={LinkedInIcon} href={"https://www.linkedin.com/in/thomas-kwashnak"} />,
          <IconLink key={"mail"} component={EmailIcon} href={"mailto:thomaskwashnak@gmail.com"} />,
        ].map((item) => (
          <li key={item.key}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const AboutMe = ({
  content,
}: {
  content: {
    title: string;
    paragraphs: Array<string>;
  };
}) => (
  <>
    <div className={scss.aboutme}>
      <div className={scss.content}>
        <div className={scss.text}>
          <h2>{content.title}</h2>
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={classNames("square", scss.avatar)}>
          <Avatar alt="An image of me" src={require("assets/images/index/aboutme.jpg")} sx={{ width: "100%", height: "100%", maxWidth: "300px", maxHeight: "300px" }} />
        </div>
      </div>
    </div>
  </>
);

const ComputerConfig = ({}) => {};

const Content = ({}) => {
  const json = require("content/index.json");

  return (
    <>
      <Head>
        <title>Thomas Kwashnak</title>
      </Head>
      <Home content={json.home} />
      <AboutMe content={json.introduction} />
      <Spacer height={"150px"} />
    </>
  );
};

export const getStaticProps = async ({}) => {
  return {
    props: {},
  };
};

export default Content;
