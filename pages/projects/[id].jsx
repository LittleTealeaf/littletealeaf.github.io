import { getGenerated } from "../../libs/resources"
import Head from 'next/head'
import { Github } from "../../libs/api";


export default function Page({id,project}) {
    

    return (
        <>
        <Head>
            <title>
                {project.name}
            </title>
        </Head>
        <div>
            
        </div>
        </>
    )
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

    const generated = getGenerated(getGenerated('index.json').pages.projects[params.id]);
    const api = await Github.getURL(`https://api.github.com/repos/${generated.github.repo}`);

    const promises = {
        languages: Github.getURL(api.languages_url),
    }


    const project = {
        name: generated.name,
        languages: await promises.languages,
        repository: api.html_url,
        website: api.homepage
    }
    
    return {
        props: {
            id: params,
            project
        }
    }
}