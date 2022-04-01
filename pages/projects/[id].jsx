import Head from "next/head";
import { Github } from "../../libs/api";
import { Config, Generated } from "../../libs/resources";

export default function Page({ id, resourcePath }) {
    if(resourcePath == null) {
        return (<></>);
    }

    const project = Generated.load(resourcePath);

    return (
        <>
        <Head>
            <title>{project.name}</title>
        </Head>
        <body>

        </body>
        </>
    );
}

export async function getStaticPaths() {
  return {
    paths: Config.listDirNames("projects").map((id) => ({
      params: {
        id: id,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const project = Config.loadJSON(`projects/${params.id}`);

  project.github.api = await Github.getRepo(project.github.repo);
  project.github.languages = await Github.get(project.github.api.languages_url);

  return {
    props: {
      id: params.id,
      resourcePath: Generated.storeJSON(`projects/${params.id}`, project),
    },
  };
}
