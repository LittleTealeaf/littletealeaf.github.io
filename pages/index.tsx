/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Spacer from "components/spacer";
import Home from "components/index/home";
import AboutMe from "components/index/aboutme";
import Projects from "components/index/projects";
import css from "styles/pages/index.module.scss";


export const config = {
  unstable_runtimeJS: false,
};

const Content = ({ }) => {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${require("assets/images/index/projects.png")})`,
          backgroundSize: "100%",
        }}
      >
        <Head>
          <title>{"Thomas Kwashnak"}</title>
        </Head>
        <Home />
        <AboutMe />
        <Projects/>
      </div>
    </>
  );
};

export const getStaticProps = async ({}) => {

  // const projectLanguages = await Promise.all(
  //   projectlist
  //     .filter((project) => project.github != null)
  //     .map((project) =>
  //       GitHubAPI.repos.listLanguages(project.github).then((response) => ({
  //         repo: GitHubRepoToString(project.github),
  //         lang: response,
  //       }))
  //     )
  // ).then((list) =>
  //   list.reduce((map, obj) => {
  //     map[obj.repo] = obj.lang;
  //     return map;
  //   }, {})
  // );

  return {
    props: {
    },
  };
};

export default Content;
