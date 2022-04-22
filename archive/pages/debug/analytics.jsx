import { MarkdownAsset } from "archive/components/markdown";
import { getGenerated, Index } from "archive/libs/resources";
import Title from "archive/components/title";

export default function Page({}) {
  return (
    <>
      <Title content="Analytics" />
      <MarkdownAsset asset={Index.markdown.debug.analytics} />
    </>
  );
}
