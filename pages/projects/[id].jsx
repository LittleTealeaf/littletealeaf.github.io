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
    return ['pages','projects',`${id}.json`];
}

export async function getStaticPaths() {
    return {
        paths: await Promise.all(Object.keys(getGenerated('index.json').pages.projects).map(async (id) => {
            console.log("Getting Data for  " + id);
            const project = getGenerated(getGenerated('index.json').pages.projects[id]);
        
            project.github.api = await Github.getURL(`https://api.github.com/repos/${project.github.repo}`);
            project.github.languages = await Github.getURL(project.github.api.languages_url);
            Build.storeJSON(project,...getData(id));

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
    

    return {
        props: {
            id: params.id,
            data: getData(params.id).join('/')
        }
    }
}