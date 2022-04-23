import React from "react";
import { Title } from "libs/header";
import { Markdown } from "libs/components";
import { Index } from "libs";

const Page = ({}) => (
  <>
    <Title value="LittleTealeaf" />
    <Markdown asset={Index.markdown.debug.cache} />
  </>
);

export default Page;
