import { MarkdownAsset } from "archive/components/markdown";
import Title from "archive/components/title";
import { Index } from "archive/libs/resources";

export default function Page({}) {
  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      {/* <Snippet name='markdowntest' /> */}
      <Title content="Cache Debug" />
      <MarkdownAsset asset={Index.markdown.debug.cache} />
    </div>
  );
}
