
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} router={useRouter()} />
        </>
    )
}
export default MyApp;