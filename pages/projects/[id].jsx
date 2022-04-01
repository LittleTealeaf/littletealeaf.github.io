import Head from "next/head";
import { Github } from "../../libs/api";
import { Config, Generated } from "../../libs/resources";

export default function Page({ id, resource }) {
  if (resource == null) {
    return <></>;
  } else {
    const project = Generated.load(resource);

    return (
      <>
        <Head>
          <title>{project.name}</title>
        </Head>
        <body></body>
      </>
    );
  }
}

export async function getStaticPaths() {
  return {
    paths: await Promise.all(
      Config.listDirNames("projects").map(async (id) => {
        const project = Config.loadJSON(`projects/${id}`);

        project.github.api = await Github.getRepo(project.github.repo);
        project.github.languages = await Github.get(
          project.github.api.languages_url
        );

        Generated.storeJSON(`projects/${id}`, project)

        return {
          params: {
            id: id
          }
        };
      })
    ),
    fallback: true,
  };
}

export async function getStaticProps({params}) {
  return {
    props: {
      id: params.id
    },
  };
}
