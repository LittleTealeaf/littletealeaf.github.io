import { MarkdownAsset } from "components/markdown";
import Title from "components/title";
import { Index } from "libs/resources";

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
