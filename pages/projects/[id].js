
import { getAllProjectIds, getProjectData } from "../../libs/dynamic";

export default function Project({ projectData, router }) {

    return (<>
        <div>
            Hello world
        </div>
    </>);
}

export async function getStaticPaths() {
    const paths = getAllProjectIds();
    return {
        paths, fallback: false
    }
}

export async function getStaticProps({ params }) {
    const projectData = getProjectData(params.id);
    return {
        props: {
            projectData
        }
    }
}