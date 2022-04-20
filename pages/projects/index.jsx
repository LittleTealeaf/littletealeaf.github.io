import Title from "components/title";
import { Index } from "libs/resources";
import Link from "next/link";

export default function Content({}) {
  return (
    <>
      <Title content="Projects" />
      <div>Oh cool, a projects page!</div>
      <ul>
        {Object.keys(Index.projects).map((item) => {
          return (
            <li key={"projects index " + item}>
              <Link href={`/projects/${item}`}>{item}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
