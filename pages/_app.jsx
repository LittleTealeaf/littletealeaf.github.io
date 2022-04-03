import style from '../styles/style.css'
import Header from '../components/header'
import {useRouter} from 'next/router'

const MyApp = ({ Component, pageProps }) => {
    return (<>
        <Header/>
        <center>
        <div style={{
            borderRadius: "100px",
            padding: "10px",
            width: "70%",
            background: "pink"
            
        }}>
            {"Hello viewer! Yes, this website is currently in development. Yes, I have decided to develop on production. Why? Because I can, and because it's easier for me. Feel free to check on back to see the progress of my website, and hopefully eventually the final result! I think at that point, I'll work on NOT testing on production... :)"}
        </div>
        </center>
        <Component {...pageProps} />
    </>)
}
export default MyApp