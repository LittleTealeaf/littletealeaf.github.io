const fs = require('fs');

export default function Project({ projectData, router }) {

    return (<>
        <div>
            {projectData.name}
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
    const projectData = {};
    return {
        props: {
            projectData
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