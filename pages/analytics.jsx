import { getGenerated, index } from "../libs/resources";

export default function Page({}) {
  const analytics = getGenerated(index.analytics);

  return (
    <>
      <pre>{JSON.stringify(analytics, undefined, 2)}</pre>
    </>
  );
}
