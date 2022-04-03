import { getGenerated } from "../../libs/resources"
import Head from 'next/head'


export default function Page({id, generatedRef}) {
    const project = getGenerated(generatedRef);
    return (
        <>
        <Head>
            <title>
                {project.name}
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
    const genRef = getGenerated('index.json').pages.projects[params.id];

    return {
        props: {
            id: params.id,
            genRef
        }
    }
}