import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'
import style from '../../styles/project.module.css'
import Link from 'next/link'
import { getAsset } from "../../libs/assets"

const UserAvatar = (reference, index) => {
    const contributor = getAsset(reference);
    return (contributor.avatar != null ? (
        <a key={index} href={contributor.html_url}>
            <img alt={contributor.login} src={getAsset(contributor.avatar)} width="30" height="30" />
        </a>
    ) : <></>
    )
}

export default function Project({ projectData, router }) {
    const data = projectData.element;
    const repo = getAsset(data.repository)

    return <div>
        <Header router={router}/>
        <h1>{repo.name}</h1>
        <h2>{getAsset(repo.owner).login}</h2>
        <div>
            Contributors: 
            {getAsset(repo.contributors).map((userobject,index) => UserAvatar(userobject.user,index))}
            
        </div>
        <div>
            Stargazers:
        {getAsset(repo.stargazers).map(UserAvatar)}
        </div>
        <div>
            Subscribers:
            {getAsset(repo.subscribers).map(UserAvatar)}
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