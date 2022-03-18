import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'
import style from '../../styles/project.module.css'
import Link from 'next/link'
import { getAsset } from "../../libs/assets"
import GithubUser from "../../components/GithubUser"


export default function Project({ projectData, router }) {
    const data = projectData.element;
    const repo = getAsset(data.repository)

    return <div>
        <Header router={router}/>
        <h1>{repo.name}</h1>
        <h2>{getAsset(repo.owner).login}</h2>
        <div>
            Contributors: 
            {getAsset(repo.contributors).map((userref,index) => <GithubUser key={index} user_ref={userref.user}/>)}
            
        </div>
        <div>
            Stargazers:
        {getAsset(repo.stargazers).map((userref,index) => <GithubUser key={index} user_ref={userref}/>)}
        </div>
        <div>
            Subscribers:
            {getAsset(repo.subscribers).map((userref,index) => <GithubUser key={index} user_ref={userref}/>)}
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