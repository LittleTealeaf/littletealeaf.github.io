import { getPath } from '../../libs/resources';

const fs = require('fs');

export default function Page({ project }) {
    console.log(project);
    return (<>

    </>);
}

export async function getStaticPaths() {
    const paths = fs.readdirSync(getPath('assets', 'projects')).map((file) => ({
        params: {
            id: JSON.parse(fs.readFileSync(getPath('assets', 'projects', file))).endpoint
        }
    }));

    return {
        paths, fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            project: {}
        }
    }
}

// function getData(id) {
//     const element = getPath('assets','projects',`${id}.json`);
//     return {
//         id,
//         element   
//     }
// }