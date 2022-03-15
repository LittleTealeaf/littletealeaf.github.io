import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'

import style from '../styles/header.module.css'
import navLinks from '../assets/navigation.json'

const NavLink = (data, i) => (
    <Link key={i} href={data.href}>
        <div className={style.navlink}>
            {data.name}
        </div>
    </Link>
)

function handleScroll() {
    console.log("hello");
}

const TITLE = (
    <div className={style.title}>
        LittleTealeaf
    </div>
)

export default function Header({ path }) {
    console.log(path);
    return (
        <div className={style.header} id='static-header'>
            <Head>
                <title>
                    {path[path.length - 1]}
                </title>
                
            </Head>
            <div className={style.headerbackground}>
            <div className={style.headerfixed}>
            <div className={style.title}>
                    LittleTealeaf
                </div>
                <div className={style.navigation}>
                {navLinks.map(NavLink)}
                </div>
            </div>
            </div>
            
            
            <Script src="./assets/js/header-scroll.js" />
        </div>
    )
}