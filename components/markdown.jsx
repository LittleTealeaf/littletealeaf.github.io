import { getGenerated, index } from "../libs/resources";
const html_parser = require("html-react-parser");

export function RenderMarkdown({ content }) {
  return <div className="markdown-body">{html_parser.default(content)}</div>;
}

export function Snippet({ name }) {
  return <RenderMarkdown content={getGenerated(index.snippets[name])} />;
}
