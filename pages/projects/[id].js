import { getPath } from '../../libs/resources';

const fs = require('fs');

export default function Project({ project, router }) {
    console.log(project);
    return (<>
        <div>
            
        </div>
    </>);
}

export async function getStaticPaths() {
    const paths = fs.readdirSync(getPath('assets','projects')).map((file) => ({
        params: {
            id: JSON.parse(fs.readFileSync(getPath('assets','projects',file))).endpoint
        }
    }));

    return {
        paths, fallback: false
    }
}

export async function getStaticProps({ params }) {
    const project = {};
    return {
        props: {
            project
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