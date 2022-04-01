
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Asset } from '../libs/resources'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
        <div>
            <h2>Header</h2>
            <p>
                Hey, welcome to my personal website. Just as a disclaimer, this website is far from being anywhere near complete. I do, however, want to make sure everything works so I will still leave this production layer up just to keep a constant record, so please come back later to check in on my progress! I am unsure how long this will take, so feel free to check back in to view my progress. 
            </p>
        </div>
            <Component {...pageProps} router={useRouter()} />
        </>
    )
}
export default MyApp;