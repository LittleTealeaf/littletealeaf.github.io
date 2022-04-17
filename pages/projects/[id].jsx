import Head from "next/head";
import { getGenerated, Index } from "libs/resources";
import { RenderMarkdown } from "components/markdown";

export async function getStaticPaths() {
  return {
    paths: Object.keys(Index.pages.projects).map((slug) => ({
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
  const project = getGenerated(Index.pages.projects[id]);

  return (
    <>
      <Head>
        <title>{project.name}</title>
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
