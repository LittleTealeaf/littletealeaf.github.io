import Header from '../components/header'
import Style from '../styles/404.module.css'

export default function Home({router}) {
    return (
        <div>
            <Header router={router}/>
            <div>
                <center className={Style.center}>
                <h1 className={Style.leftText}>404</h1>

                    <div className={Style.verticalBar}>
                        <h2 className={Style.rightText}>This page could not be found.</h2>
                    </div>
                    </center>
            </div>
        </div>
    )
}
