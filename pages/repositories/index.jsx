import { getGenerated, index } from "../../libs/resources";

export default function Content({}) {
  return (
    <>
      <div>REPOS</div>
      <div className="flex flex-wrap" style={{}}>
        {Object.keys(index.pages.repositories).map((id) => {
          const repo = getGenerated(index.pages.repositories[id]);

          return (
            <>
              <div
                className="flex-grow-[1]"
                style={{
                  padding: "10px",
                }}
              >
                <h1>{repo.api.name}</h1>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
