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
      <Title content={project.index.name} />
      <MarkdownObject object={project.post} />

      {Object.keys(project.repos).map((category) => (
        <details key={category}>
          <summary>{category}</summary>
          {Object.keys(project.repos[category]).map((repo) => (
            <details
              key={repo}
              style={{
                padding: "0px 20px",
              }}
            >
              <summary>{project.repos[category][repo].name}</summary>
              <div
                style={{
                  padding: "5px 10px",
                }}
              >
                <MarkdownObject object={project.repos[category][repo].readme} />
              </div>
            </details>
          ))}
        </details>
      ))}
    </div>
  );
}
