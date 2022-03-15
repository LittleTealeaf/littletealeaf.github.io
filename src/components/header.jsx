import './header.css';
import navlinks from '../res/navigation.json';
import { NavLink } from 'react-router-dom';



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
                        // <a href={data.href} class="navbutton">
                        //     {data.name}
                        // </a>
                        <NavLink to={data.href} className="navbutton">{data.name}</NavLink>
                    ))
                }
            </div>
        </div>

    )
}


export default Header;