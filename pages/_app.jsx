
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
        <div>
            <h2>Header</h2>
        </div>
            <Component {...pageProps} router={useRouter()} />
        </>
    )
}
export default MyApp;