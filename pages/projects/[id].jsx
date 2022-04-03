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
/*
What's going on?

Apparently, it only reads files that were loaded beforehand, so I can't just generate a file and then read from it within the same script for some odd reason, so now I gotta figure out how to work this out with pre-generating data and getting them to the other stuff.
*/

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