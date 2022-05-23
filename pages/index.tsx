/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Spacer from "components/spacer";
import Home from "components/index/home";
import AboutMe from "components/index/aboutme";
import Component from "components/index/projects";
import scss from "styles/pages/index.module.scss";

export const config = {
  unstable_runtimeJS: false,
};

const Content = ({}) => {
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
        <Component />
      </div>
    </>
  );
};

export const getStaticProps = async ({}) => {
  return {
    props: {},
  };
};

export default Content;
