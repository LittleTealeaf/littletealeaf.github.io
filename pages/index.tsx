/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Icon } from "@mui/material";
import iconStyle from "styles/icon.module.scss";
import utilStyle from "styles/util.module.scss";
import { GitHubAPI } from "libs/github";
import { filterUnique } from "libs/utils";
import { RestEndpointMethodTypes } from "@octokit/rest";

export const config = {
  unstable_runtimeJS: false,
};

const IconLink = ({ component, href }) => (
  <a href={href} className={iconStyle.container}>
    <Icon component={component} className={iconStyle.icon} />
  </a>
);

const Home = ({ content }: { content: { name: string; subheader: string; position: string } }) => (
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
        {content.name}
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
        <p>{content.subheader}</p>
        <p>{content.position}</p>
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

const AboutMe = ({ content: introduction }: { content: Array<string> }) => (
  <>
    <div
      style={{
        backgroundColor: "#283334",
        color: "white",
        boxShadow: "10px 30px 50px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap-reverse",
          wordWrap: "normal",
          padding: "50px 0px 50px 0px",
          width: "100%",
          height: "100%",
          margin: "auto",
        }}
      >
        <div
          style={{
            flexGrow: 2,
            padding: "0px 20px 0px 20px",
            wordWrap: "normal",
            width: "70%",
            fontFamily: "sans-serif",
          }}
        >
          <h2
            style={{
              width: "50%",
              margin: "auto",
              textAlign: "center",
            }}
          >
            Hello! My name is Thomas Kwashnak!
          </h2>
          {introduction.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div
          className={utilStyle.square}
          style={{
            display: "inline-block",
            minWidth: "300px",
            padding: "10px 20px 20px 20px",
            flexGrow: 0,
            margin: "auto",
          }}
        >
          <Avatar
            alt="An image of me"
            src={require("assets/images/home/aboutme.jpg")}
            sx={{ width: 300, height: 300 }}
            style={{
              margin: "auto",
              boxShadow: "0px 10px 50px 5px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </div>
    </div>
  </>
);

const Content = ({}) => {
  const json = require("content/index.json");

  return (
    <>
      <Head>
        <title>Thomas Kwashnak</title>
      </Head>
      <Home content={json.home} />
      <AboutMe content={json.introduction} />
    </>
  );
};

export const getStaticProps = async ({}) => {
  return {
    props: {},
  };
};

export default Content;
