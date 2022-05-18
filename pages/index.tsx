/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Spacer from "components/spacer";
import Home from "components/index/home";
import AboutMe from "components/index/aboutme";

export const config = {
  unstable_runtimeJS: false,
};

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
