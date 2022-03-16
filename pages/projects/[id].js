import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'
import style from '../../styles/project.module.css'
import Link from 'next/link'
import { getAsset } from "../../libs/assets"

const UserAvatar = (reference, index) => {
    const contributor = getAsset(reference)
    return (contributor.avatar != null ? (
        <a key={index} href={contributor.api.html_url}>
            <img alt={contributor.api.login} src={getAsset(contributor.avatar)} width="30" height="30" />
        </a>
    ) : <></>
    )
}

export default function Project({ projectData }) {
    var data = projectData.element;
    const api = getAsset(data.api)

    return <div>
        <Header path={
            ["projects", api.name]
        } />
        <h1>{api.name}</h1>
        <h2>{api.owner.login}</h2>
        <div>
            Contributors: 
            {getAsset(data.contributors).map(UserAvatar)}
            
        </div>
        <div>
            Stargazers:
        {getAsset(data.stargazers).map(UserAvatar)}
        </div>
        <div>
            Subscribers:
            {getAsset(data.subscribers).map(UserAvatar)}
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