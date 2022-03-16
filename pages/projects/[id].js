import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'
import style from '../../styles/project.module.css'
import Link from 'next/link'

const ContributorAvatar = (contributor_reference, index) => {
    const contributor = require('../../assets/generated/' + contributor_reference)
    return (contributor.avatar != null ? (
        <a key={index} href={contributor.api.html_url}>
            <img alt={contributor.api.login} src={require('../../assets/generated/' + contributor.avatar)} width="30" height="30" />
        </a>
    ) : <></>
    )
}

export default function Project({ projectData }) {
    var data = projectData.element;

    return <div>
        <Header path={
            ["projects", data.api.name]
        } />
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