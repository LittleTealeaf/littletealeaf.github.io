import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'

export default function Project({ projectData }) {
    var data = projectData.element;
    return <div>
        <Header />
        <h1>{data.api.name}</h1>
        <h2>{data.api.owner.login}</h2>
        
    </div>
}

export async function getStaticPaths() {
    const paths = getAllProjectIds();
    return {
        paths, fallback: false
    }
}

export async function getStaticProps({ params }) {
    const projectData = getProjectData(params.id)
    return {
        props: {
            projectData
        }
    }
}