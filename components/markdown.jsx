import { getGenerated, Index } from "libs/resources";
const html_parser = require("html-react-parser");
import Meta from 'components/meta'

export function RenderMarkdown({ content }) {
  return <div className="markdown-body">{html_parser.default(content)}</div>;
}

export function Snippet({ name }) {
  return <RenderMarkdown content={getGenerated(Index.snippets[name])} />;
}

export function MarkdownAsset({asset}) {
  const item = getGenerated(asset);
  return <>
  {
    Object.keys(item).filter(key => key != 'content').map(key => (
      <Meta key={key} name={key} content={item[key]} />
    ))
  }
  <RenderMarkdown content={item['content']} />
  </>
}
