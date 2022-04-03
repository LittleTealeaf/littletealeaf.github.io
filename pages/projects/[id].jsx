import { Build, getGenerated } from "../../libs/resources"
import Head from 'next/head'
import { Github } from "../../libs/api";


export default function Page({id, data}) {
    const project = Build.get(data);
    

    return (
        <>
        <Head>
            <title>
            </title>
        </Head>
        <div>
            {project.name}
        </div>
        </>
    )
}

function getData(id) {
    return ['pages','projects',`${id}.json`].join('/');
}

export async function getStaticPaths() {
    console.log("");
    return {
        paths: await Promise.all(Object.keys(getGenerated('index.json').pages.projects).map(async (id) => {
            const project = getGenerated(getGenerated('index.json').pages.projects[id]);
        
            project.github.api = await Github.getURL(`https://api.github.com/repos/${project.github.repo}`);
            project.github.languages = await Github.getURL(project.github.api.languages_url);

            console.log("Stored data in: " + Build.storeJSON(project,getData(id)));

            return ({
                params: {
                    id
                }
            });
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    

    console.log("Fetching Static Props for " + params.id);
    return {
        props: {
            id: params.id,
            data: getData(params.id)
        }
    }
}