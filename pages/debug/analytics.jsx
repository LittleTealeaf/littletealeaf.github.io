import { MarkdownAsset } from "components/markdown";
import { getGenerated, Index } from "libs/resources";
import Title from "components/title";

export default function Page({}) {
  return (
    <>
      <Title content="Analytics" />
      <MarkdownAsset asset={Index.markdown.debug.analytics} />
    </>
  );
}
