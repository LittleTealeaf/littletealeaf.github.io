import Head from 'next/head'
import Header from '../../components/header'
import { Analytics } from '../../libs/assets'
import style from '../../styles/style.module.css'

// Maybe want to make this more static

const PythonAnalytics = () => {

    return (
        <div className={style.section} style={{

        }}>
            <center>
                <h2>
                    Website Analytics
                </h2>
            </center>
            <div style={{
                'display':'flex',
                'flexDirection':'row',
                'flexWrap':'wrap'
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
            </div>
        </div>
    )
}
