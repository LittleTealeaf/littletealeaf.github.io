import Head from "next/head";
import { getGenerated, index } from "../../libs/resources";
import { RenderMarkdown } from "../../components/markdown";

/*
What's going on?

Apparently, it only reads files that were loaded beforehand, so I can't just generate a file and then read from it within the same script for some odd reason, so now I gotta figure out how to work this out with pre-generating data and getting them to the other stuff.

https://stackoverflow.com/questions/60899880/next-js-reduce-data-fetching-and-share-data-between-pages
*/

export async function getStaticPaths() {
  return {
    paths: Object.keys(index.pages.projects).map((slug) => ({
      params: {
        id: slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default function Page({ id }) {
  const project = getGenerated(index.pages.projects[id]);

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div
        style={{
          padding: "100px",
        }}
      >
        {project.github == null || project.github.readme == null ? (
          <></>
        ) : (
          <RenderMarkdown content={project.github.readme} />
        )}
      </div>
    </>
  );
}
