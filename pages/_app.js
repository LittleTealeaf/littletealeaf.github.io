import style from '../styles/style.css'
import {useRouter} from 'next/router'

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} router={useRouter()} />
}
export default MyApp