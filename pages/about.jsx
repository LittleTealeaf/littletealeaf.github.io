import { MarkdownAsset } from "components/markdown";
import {Index} from 'libs/resources'
import Meta from "components/meta";
import Title from "components/title";

export default function Page({}) {
  return (
    <>
      <Meta
        values={{
          page: "about",
        }}
      />
      <Title content="About me" />
      <MarkdownAsset asset={Index.markdown.snippets.aboutme} />
    </>
  );
}
