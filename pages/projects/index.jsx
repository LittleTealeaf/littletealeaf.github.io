import { useRouter } from "next/router";

export default function Home({ router, props }) {
  return (
    <>
      <div>This is the home page</div>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
// import { readdirSync } from "fs";
// import { Github } from "../../libs/api";
// import { Assets, Resource } from "../../libs/resources";

// export default function Page({ id, resourcePath }) {
//     const project = Resource.load(resourcePath);

//     return (<>
//     <div>
//         {JSON.stringify(project)}
//     </div>
//     </>);
// }

// export async function getStaticPaths() {
//     return {
//         paths: readdirSync('assets/projects/').map(file => (
//             {
//                 params: {
//                     id: file.replace(/\.[^/.]+$/, "")
//                 }
//             }
//         )),
//         fallback: false
//     }
// }

// export async function getStaticProps({ params }) {

//     const project = JSON.parse(Assets.readAsset(`projects/${params.id}.json`).toString());

//     project.github.api = await Github.getAPI(project.github.url);
//     project.github.api.languages = await Github.getAPI(project.github.api.languages_url);

        

//     return {
//         props: {
//             id: params.id,
//             resourcePath: Resource.storeJSON(`projects/${params.id}`,project)
//         }
//     }
// }