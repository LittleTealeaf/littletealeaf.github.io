import { Build, getGenerated } from "../../libs/resources"
import Head from 'next/head'
import { Github } from "../../libs/api";


export default function Page({id, data}) {
    // const project = Build.get(data);
    

    return (
        <>
        <Head>
            <title>
            </title>
        </Head>
        <div>
            
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

https://stackoverflow.com/questions/60899880/next-js-reduce-data-fetching-and-share-data-between-pages
*/

export async function getStaticPaths() {
    console.log("");
    return {
        paths: Object.keys(getGenerated('index.json').pages.projects).map(id => ({
            params: {
                id
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const project =  getGenerated(getGenerated('index.json').pages.projects[params.id]);

    project.github.api = await Github.getURL(`https://api.github.com/repos/${project.github.repo}`)

    const promises = {
        languages: Github.getURL(project.github.api.languages_url)
    }

    project.github.languages = await promises.languages;
    
    return {
        props: {
            id: params.id,
            project
        }
    }
}