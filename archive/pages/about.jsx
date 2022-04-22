import { MarkdownAsset } from "archive/components/markdown";
import { Index } from "archive/libs/resources";
import Meta from "archive/components/meta";
import Title from "archive/components/title";

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
