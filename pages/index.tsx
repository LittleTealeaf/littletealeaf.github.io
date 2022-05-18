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
            flexGrow: 1,
            padding: "0px 20px 0px 20px",
            wordWrap: "normal",
            width: "70%",
          }}
        >
          i am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi
          am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super birdi am a super bird
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

        {/* <div
          style={{
            display: "inline-block",
            flexGrow: 0.5,
          }}
        >

          <Avatar
            alt="An image of me"
            src={require("assets/images/home/aboutme.jpg")}
            sx={{
              width: 300,
              height: 300,
            }}
            style={{
              boxShadow: "5px 5px 30px 10px rgba(0,0,0,0.5)",
              width: "100",
              maxWidth: 300,
            }}
          />
        </div> */}
      </div>
    </div>
    <div>helloawefawefawefawef</div>
  </>
);

const Content = ({ recentRepositories }: { recentRepositories: RestEndpointMethodTypes["repos"]["get"]["response"]["data"][] }) => (
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

  const recentRepositories = await Promise.all(
    activity
      .map((event) => event.repo.name)
      .filter(filterUnique)
      .map((name) => ({
        owner: name.split("/")[0],
        repo: name.split("/")[1],
      }))
      .map(GitHubAPI.repos.get)
  );

  return {
    props: {
      recentRepositories,
    },
  };
};

export default Content;
