import Head from "next/head";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Icon } from "@mui/material";
import iconStyle from "styles/icon.module.scss";
import { GitHubAPI } from "libs/github";
import { filterUnique } from "libs/utils";

export const config = {
  unstable_runtimeJS: false,
};

const IconLink = ({ component, href }) => (
  <a href={href} className={iconStyle.container}>
    <Icon component={component} className={iconStyle.icon} />
  </a>
);

const Home = ({}) => (
  <div
    style={{
      background: `url(${require("assets/images/background.jpg")}) no-repeat top center`,
      backgroundSize: "cover !important",
      WebkitBackgroundSize: "cover !important",
      height: "100vh",
      width: "100%",
      color: "white",
      textAlign: "center",
      display: "block",
    }}
  >
    <div
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        margin: "0 auto",
        width: "85%",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "70px",
          marginTop: 250,
        }}
      >
        Thomas Kwashnak
      </div>
      <hr
        style={{
          width: "600px",
          borderColor: "rgba(150, 150, 150, 0.5)",
          border: "solid #E3E3E3",
          borderWidth: "1px 0 0",
          clear: "both",
          height: 0,
        }}
      />
      <div
        style={{
          fontSize: "19px",
          fontFamily: "monospace",
        }}
      >
        <p>Computer Science | Data Science | Software Engineering</p>
        <p>Student at Quinnipiac University</p>
      </div>
      <ul
        style={{
          listStyle: "none outside",
        }}
      >
        {[
          <IconLink key={"github"} component={GitHubIcon} href={"https://www.github.com/LittleTealeaf"} />,
          <IconLink key={"linkedin"} component={LinkedInIcon} href={"https://www.linkedin.com/in/thomas-kwashnak"} />,
          <IconLink key={"mail"} component={EmailIcon} href={"mailto:thomaskwashnak@gmail.com"} />,
        ].map((item) => (
          <li
            key={item.key}
            style={{
              display: "inline-block",
              paddingInline: 5,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const AboutMe = ({}) => (
  <>
    <div></div>
  </>
);

const Content = ({}: {}) => (
  <>
    <Head>
      <title>Thomas Kwashnak</title>
    </Head>
    <Home />
    <AboutMe />
  </>
);

export const getStaticProps = async ({}) => {
  const activity = await GitHubAPI.activity.listPublicEventsForUser({
    username: "LittleTealeaf",
    page: 1,
    per_page: 100,
  });

  const repos: string[] = activity.map((event) => event.repo.name).filter(filterUnique);

  return {
    props: {
      repos,
    },
  };
};

export default Content;
