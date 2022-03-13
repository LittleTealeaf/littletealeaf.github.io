import './header.css'
import navlinks from '../res/navigation.json'



function Header() {

    return (
        <div class="header">
            <div class="title">
                <h1>Thomas Kwashnak</h1>
                <h2>LittleTealeaf</h2>
            </div>
            <div class="navigation">
                {
                    navlinks.map((data) => (
                        <a href={data.href} class="navbutton">
                            {data.name}
                        </a>
                    ))
                }
            </div>
        </div>

    )
}


export default Header;