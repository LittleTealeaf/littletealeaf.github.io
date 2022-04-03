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


export async function getStaticPaths() {
    return {
        paths: Object.keys(getGenerated('index.json').pages.projects).map((key) => ({
            params: {
                id: key
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const project = getGenerated(getGenerated('index.json').pages.projects[params.id]);

    project.github.api = await Github.getURL(`https://api.github.com/repos/${project.github.repo}`);
        

    return {
        props: {
            id: params.id,
            data: Build.storeJSON(project,'pages','projects',`${params.id}.json`)
        }
    }
}