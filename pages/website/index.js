import Head from 'next/head'
import Header from '../../components/header'
import Link from 'next/link'
import { Analytics, WebsiteRepository, getAsset } from '../../libs/assets'
import style from '../../styles/style.module.css'
import GithubUser from '../../components/githubuser'

// Maybe want to make this more static

const PythonAnalytics = () => {

    return (
        <div className={style.section} style={{
            'flexGrow': 1
        }}>
            <center>
                <h2>
                    Website Analytics
                </h2>
            </center>
            <div style={{
                'display': 'flex',
                'flexDirection': 'row',
                'flexWrap': 'wrap'
            }}>
                {Analytics.map((item, i) => (
                    <div className={style.section} key={i}>
                        <b style={{
                            'margin': '0px 5px'
                        }}>
                            {item.name}:
                        </b>
                        {item.value}
                    </div>
                ))}
            </div>
        </div>
    )
}

const RepositoryStatistics = () => {

    const Repo = WebsiteRepository;

    const Languages = () => {
        const languages = getAsset(Repo.languages);

        const max = Object.keys(languages).reduce((partial, key) => partial + languages[key].value, 0);

        const toPercentage = (value) => {
            const percentage = (100.0 * value) / max;
            return `${percentage.toFixed(3)}%`
        }

        return (
            <div className={style.section}>
                <center>
                    <h3>
                        Languages
                    </h3>
                </center>
                <table >
                    {
                        Object.keys(languages).map((key, i) => (
                            <tr key={i}>
                                <td style={{
                                    'textAlign': 'right',
                                    'padding': '0px 10px'
                                }}>{key}</td>
                                <td>{toPercentage(languages[key].value)}</td>

                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }

    const Contributors = () => {
        const contributors = getAsset(Repo.contributors);

        return (
            <div className={style.section}>
                <center>
                    <h3>
                        Contributors
                    </h3>
                </center>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    {
                        getAsset(Repo.contributors).map((user,index) => (
                            < GithubUser user_ref={user.user} key={index}/>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={style.section} style={{
            'flexGrow': 1
        }}>
            <center>
                <h2>
                    Repository
                </h2>
                <Link href={Repo.html_url}>
                    <a>
                        See Website on Github
                    </a>
                </Link>
            </center>
            <div style={{
                'display': 'flex',
                'flexDirection': 'row',
                'flexWrap': 'wrap'
            }}>
                {Contributors()}
                {Languages()}
            </div>
        </div>
    )
}

export default function Home({ router }) {
    return (

        <div>
            <Header router={router} title="LittleTealeaf - About Website" />
            <div style={{
                'margin': '20px',
                'display': 'flex',
                'flexDirection': 'row',
                'flexWrap': 'wrap'
            }}>
                {PythonAnalytics()}
                {RepositoryStatistics()}
            </div>
        </div>
    )
}
