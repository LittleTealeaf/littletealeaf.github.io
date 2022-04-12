const html_parser = require("html-react-parser");

export default function Markdown({ content }) {
  return (
    <div className='markdown-body'>
      {html_parser.default(content)}
    </div>
  )
}
