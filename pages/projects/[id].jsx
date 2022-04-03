import { Build, getGenerated } from "../../libs/resources"
import Head from 'next/head'


export default function Page({id, data}) {
    
    return (
        <>
        <Head>
            <title>
            </title>
        </Head>
        <div>
            {JSON.stringify(getGenerated(data))}
        </div>
        </>
    )
}


export async function getStaticPaths() {
    const projects = getGenerated('index.json').pages.projects;
    return {
        paths: Object.keys(projects).map((key) => ({
            params: {
                id: key
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const project = getGenerated(getGenerated('index.json').pages.projects[params.id]);

    return {
        props: {
            id: params.id,
            data: Build.storeJSON(project,'pages','projects',`${params.id}.json`)
        }
    }
}