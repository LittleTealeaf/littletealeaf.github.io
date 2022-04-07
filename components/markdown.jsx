import style from "../styles/markdown.module.scss";
import hljs from "highlight.js";
const html_parser = require("html-react-parser");
const markdown_it = require("markdown-it")({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return "";
  },
  linkify: true,
  xhtmlOut: true,
  html: true
});

export default function Markdown({ content }) {
  return (
    <div className={style.markdown}>
      {html_parser.default(markdown_it.render(content).replace('\r\n\n','\n'))}
    </div>
  );
}
