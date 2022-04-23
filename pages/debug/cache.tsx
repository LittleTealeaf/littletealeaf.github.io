import Markdown from "libs/components/Markdown";
import Title from "libs/components/Title";
import { Index } from "libs/assets";
import React from "react";

const Page =  ({}) => {
  return (
    <>
      <Title text="Cache Debug" />
      <Markdown asset={Index.markdown.debug.cache} />
    </>
  );
};

export default Page;
