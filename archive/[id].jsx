import { Github } from './libs2/api';
import { getPathDeprecated, ResourceDeprecated } from '../libs/resources';
const fs = require('fs');

export default function Page({ id }) {
    
    const api = Github.getAPI("https://api.github.com")

    return (<>
        
    </>);
}

export async function getStaticPaths() {
    return {
        paths: fs.readdirSync(getPathDeprecated('assets', 'projects')).map((file) => (
            {
                params: {
                    id: file.replace(/\.[^/.]+$/, "")
                }
            }
        )),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            id: params.id,
            project: ResourceDeprecated.text(fs.readFileSync(getPathDeprecated('assets','projects',`${params.id}.json`)))
        }
    }
}