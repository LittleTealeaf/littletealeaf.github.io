import { getGenerated, Index } from "libs/resources";
import { MarkdownAsset, MarkdownObject } from "components/markdown";
import Title from "components/title";

export async function getStaticPaths() {
  return {
    paths: Object.keys(Index.projects).map((slug) => ({
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
  const project = getGenerated(Index.projects[id]);

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <Title content={project.name} />
      <MarkdownObject object={project.about} />

      {Object.keys(project.repos).map((reponame) => {
        const repo = getGenerated(project.repos[reponame]);
        return (
          <details key={reponame}>
            <summary>{reponame}</summary>
            <MarkdownObject object={repo.readme} />
          </details>
        );
      })}
    </div>
  );
}
