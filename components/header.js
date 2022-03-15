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
        <div className={style.header} id="header">
            <Head>
                <title>
                    {path[path.length - 1]}
                </title>
                
            </Head>
            <div>
                {navLinks.map(NavLink)}
            </div>
            <Script src="./assets/js/header-scroll.js" />
        </div>
    )
}