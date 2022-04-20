import { getGenerated, Index } from "libs/resources";
const html_parser = require("html-react-parser");
import Meta from "components/meta";

export function RenderMarkdown({ content }) {
  return (
    <article className="markdown-body">{html_parser.default(content)}</article>
  );
}

/**
 * Deprecated
 */
export function Snippet({ name }) {
  return <RenderMarkdown content={getGenerated(Index.snippets[name])} />;
}

export function MarkdownAsset({ asset }) {
  return <MarkdownObject object={getGenerated(asset)} />;
}

export function MarkdownObject({ object }) {
  return (
    <>
      {Object.keys(object)
        .filter((key) => key != "content")
        .map((key) => (
          <Meta key={key} name={key} content={object[key]} />
        ))}
      <RenderMarkdown content={object["content"]} />
    </>
  );
}
