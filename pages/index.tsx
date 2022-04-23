import React from "react";
import { Markdown, Title } from "libs/components";
import { Index } from "libs";

const Page = ({}) => (
  <>
    <Title value="LittleTealeaf" />
    <Markdown asset={Index.markdown.debug.cache} />
  </>
);

export default Page;
