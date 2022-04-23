import React from "react";
import Title from "libs/components/Title";
import Markdown from "libs/components/Markdown";
import { Index } from "libs/generated";

const Page = ({}) => (
  <>
    <Title text="LittleTealeaf" />
    <Markdown asset={Index.markdown.debug.cache} />
  </>
);

export default Page;
