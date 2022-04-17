import { MarkdownAsset } from "components/markdown";
import {Index} from 'libs/resources'
import Meta from "components/meta";

export default function Page({}) {
  return (
    <>
      <Meta
        values={{
          page: "about",
        }}
      />
      <MarkdownAsset asset={Index.markdown.snippets.aboutme} />
    </>
  );
}
