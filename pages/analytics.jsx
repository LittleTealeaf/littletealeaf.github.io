import { getGenerated, index } from "../libs/resources";
import hljs from "highlight.js";
const html_parser = require('html-react-parser');
const markdown_it = require('markdown-it')({
    highlight: (str,lang) => {
        if(lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch(__) {}
        }
        return '';
    }
});


export default function Page({}) {
  const analytics = getGenerated(index.analytics);
  const json_string = '```json\n' + JSON.stringify(analytics, undefined, 2) + '\n```';

  return (
    <>
      <div>
        <p style={{
          padding: '10px'
        }}>
          {html_parser.default(markdown_it.render(json_string))}
        </p>
      </div>
    </>
  );
}
