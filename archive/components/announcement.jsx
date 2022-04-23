import { getGenerated, Index } from "archive/libs/resources";
import {MarkdownAsset} from 'archive/components/markdown';

export default function Announcement({}) {


  return (
    <center>
      {Object.keys(Index.markdown.announcements).map((key, index) => (
        <div
          key={index}
          style={{
            borderRadius: "100px",
            padding: "10px",
            width: "70%",
            background: "pink",
          }}
        >
          <MarkdownAsset asset={Index.markdown.announcements[key]} />
        </div>
      ))}
    </center>
  );
}