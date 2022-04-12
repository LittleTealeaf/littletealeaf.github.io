import { getGenerated, index } from "../libs/resources";
import {RenderMarkdown} from "../components/markdown";

export default function Page({}) {
  const analytics = getGenerated(index.analytics);
  const json_string =
    "```json\n" + JSON.stringify(analytics, undefined, 2) + "\n```";

  return (
    <>
      <RenderMarkdown content={json_string} />
    </>
  );
}
