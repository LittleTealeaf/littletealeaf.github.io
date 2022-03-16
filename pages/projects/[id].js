import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'

const ContributorAvatar = (contributor,index) => (
    <div key={index}>
        <img src={contributor.avatar_url} width="30" height="30"></img>
    </div>
)

export default function Project({ projectData }) {
    var data = projectData.element;
    return <div>
        <Header path={
            ["projects",data.api.name]
        }/>
        <h1>{data.api.name}</h1>
        <h2>{data.api.owner.login}</h2>
        <div>
            {data.contributors.map(ContributorAvatar)}
        </div>
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