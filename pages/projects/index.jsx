import { index } from "../../libs/resources";
import Link from "next/link";

export default function Content({}) {
  return (
    <>
      <div>Oh cool, a projects page!</div>
      <ul>
        {Object.keys(index.pages.projects).map((item, index) => {
          return (
            <li key={index}>
              <Link href={`/projects/${item}`}>{item}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
