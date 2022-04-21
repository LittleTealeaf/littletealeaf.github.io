import { getGenerated, Index } from "libs/resources";
const html_parser = require("html-react-parser");
import Meta from "components/meta";

export const RenderMarkdown = ({ content }) => <article className="markdown-body">{html_parser.default(content)}</article>;

/**
 * Deprecated
 * @param {} param0
 * @returns
 */
export const Snippet = ({ name }) => <RenderMarkdown contnet={getGenerated(Index.snippets[name])} />;

export const MarkdownAsset = ({ asset }) => <MarkdownObject object={getGenerated(asset)} />;

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
