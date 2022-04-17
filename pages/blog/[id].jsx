import { getGenerated, Index } from "libs/resources";
import Head from "next/head";
import { RenderMarkdown } from "components/markdown";

export async function getStaticPaths() {
  return {
    paths: Object.keys(Index.markdown.blogs).map((slug) => ({
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
  const blog = getGenerated(Index.markdown.blogs[id]);

  return (
    <>
      <Head>{blog.title != null ? <title>{blog.title}</title> : ""}</Head>
      <RenderMarkdown content={blog.content} />
    </>
  );
}
