import style from '../styles/style.css'

const MyApp = ({ Component, pageProps }) => {
    return (<>
        <center>
        <div style={{
            borderRadius: "100px",
            padding: "10px",
            width: "70%",
            background: "pink"
            
        }}>
            {"Hey, just wanted to give a heads up that this website is currently under development. I've decided that since I'm once again building from the ground up, I'll be scrapping the previous iteration and building from there. Sorry if there was any information you wanted to see, but for now I would like to give a more thorough work on the project with multiple branches like I did at first. I'm sure this message will disappear after a while, and the website will be updated, but I will see you until then!"}
        </div>
        </center>
        <Component {...pageProps} />
    </>)
}
export default MyApp