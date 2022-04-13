import { Snippet } from "../components/markdown";
import Meta from "../components/meta";

export default function Page({}) {
  return (
    <>
      <Meta
        values={{
          page: "about",
        }}
      />
      <Snippet name="aboutme" />
      <Snippet name="interests" />
    </>
  );
}
