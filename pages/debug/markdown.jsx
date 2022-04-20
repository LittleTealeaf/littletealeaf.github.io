import { MarkdownAsset, Snippet } from "components/markdown";
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
      <Title content="Markdown Debug" />
      <MarkdownAsset asset={Index.markdown.snippets.markdowntest} />
    </div>
  );
}
