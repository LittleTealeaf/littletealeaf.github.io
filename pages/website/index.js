import Head from 'next/head'
import Header from '../../components/header'
import { Analytics } from '../../libs/assets'
import style from '../../styles/style.module.css'

const PythonAnalytics = () => {
    
    return (
        <div className={style.section} style={{
           
        }}>
            <center>
                <h2>
                    Python Data Analytics
                </h2>
            </center>
            <div>
                This website uses Python in order to compile, organize, and store data in a format easy for NextJS to read. The following are statistics pertaining to this.
            </div>
            <table>
                <tr>
                    <td style={{
                        'textAlign':'right'
                    }}>
                        <b>
                            Github API Calls: 
                        </b>
                    </td>
                    <td style={{
                        'textAlign':'center'
                    }}>
                        {Analytics.api_calls}
                    </td>
                </tr>
                <tr>
                    <td style={{
                        'textAlign':'right'
                    }}>
                        <b>
                            Image Fetch Requests:
                        </b>
                    </td>
                    <td style={{
                        'textAlign':'center'
                    }}>
                        {Analytics.image_calls}
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default function Home({router}) {
  return (
    
    <div>
      <Header router={router} title="LittleTealeaf - About Website"/>
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
