import { getAllProjectIds, getProjectData } from "../../libs/projects"
import Header from '../../components/header'
import style from '../../styles/style.module.css'
import Link from 'next/link'
import { getAsset } from "../../libs/assets"
import GithubUser from "../../components/githubuser"


const About = (description) => {
    return (
        <div className={style.section} style={{
            'flexGrow': 1,
            'display': 'flex',
            'flexDirection':'column'
        }}>
            <h2 className={style.widesection} style={{
                'flexGrow':1
            }}>About</h2>
            <p className={style.widesection} style={{
                'flexGrow': 4
            }}>{description}</p>
        </div>
    )
}

const SocialPanel = (repo) => {
    const contributors = getAsset(repo.contributors);
    const stargazers = getAsset(repo.stargazers);


    return (
        <div className={style.section} style={{
            'flexGrow': 1
        }}>
            <center>
                <h2 className={style.widesection}>
                    Socials
                    </h2>
                    
                    <div className={style.widesection}>
                        <h4 style={{
                            'margin':'0'
                        }}>Contributors:</h4>
                        {
                            contributors.map((obj,i) => (
                                <GithubUser user_ref={obj.user} key={i} />
                            ))
                        }
                    </div>
                    <div className={style.widesection}>
                        <h4 style={{
                            'margin':'0'
                        }}>Stargazers: {repo.stargazers_count}</h4>
                        {
                            stargazers.map((user,i) => (
                                <GithubUser user_ref={user} key={i} />
                            ))
                        }
                    </div>
                
                </center>
            
        </div>
    )
}

const Languages = (repo) => {
    const languages = getAsset(repo.languages);
    
    // const max = languages.reduce((partial,item) => partial + item.value,0);
    const max = Object.keys(languages).reduce((partial,key) => partial + languages[key],0);


    const toPercentage = (value) => {
        const percentage = (100.0 * value) / max;
        return `${percentage.toFixed(3)}%`
    }

    return (
        <div className={style.section} style={{
            'flexGrow':1
        }}>
            <h2 className={style.widesection}>
                Languages
            </h2>
            <table className={style.widesection}>
                {
                  Object.keys(languages).map((key,i) => (
                    <tr key={i}>
                        <td style={{
                        'textAlign':'right',
                        'padding':'0px 10px'
                    }}>{key}</td>
                        <td>{toPercentage(languages[key])}</td>
                        
                    </tr>
                ))  
                }
            </table>
        </div>
    )
}



export default function Project({ projectData, router }) {
    const data = projectData.element;
    const attributes = getAsset(data.attributes);
    const repo = getAsset(data.repository);

    const name = attributes.name == null ? repo.name : attributes.name;
    const description = attributes.description == null ? repo.description : attributes.description;


    return <div>
        <Header router={router} title={`LittleTealeaf - ${name}`}/>
        <center>
            <div className={style.section} style={{
                'width':'80%'
            }}>
                <h1 className={style.widesection} style={{
                    'fontSize': '40px'
                }}>
                    {name}
                </h1>
                <div style={{
                    'display':'flex',
                    'flexDirection':'row',
                    'flexWrap':'wrap'
                }}>
                    {About(description)}
                    {SocialPanel(repo)}
                    {Languages(repo)}
                </div>
            </div>
        </center>
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