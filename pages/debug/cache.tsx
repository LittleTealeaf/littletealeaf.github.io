import Markdown from "libs/components/Markdown";
import Title from "libs/components/Title";
import { getResource, Index } from "libs/assets";
import React from "react";

const Page = ({content}) => {
  return (
    <>
      <Title text="Cache Debug" />
      <Markdown object={content} />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      content: getResource(Index.markdown.debug.cache)
    }
  }
}

export default Page;
