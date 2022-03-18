import Head from 'next/head'
import Link from 'next/link'
// import Script from 'next/script'

import style from '../styles/header.module.css'
import { Navigation as navLinks } from '../libs/assets'
// import StyleClass from '../libs/styleutil'



/*
THE PLAN:

When the user is at the top, the whole header is displayed, with the name on the left
when the user scrolls, the name on the left disappears completely, and the navigation hides partially in the cieling
when the user hovers over the navigation bar, it expands

potentially?
*/


export default function Header({router}) {
    return (
        <div className={style.header}>
            <Head>

            </Head>
            <div className={style.title}>
                <h1>Thomas Kwashnak</h1>
                <h2>LittleTealeaf</h2>
            </div>
            <div className={style.navigation}>
                {
                    navLinks.map((data, i) => {
                        if (router.asPath == data.href) {
                            return (
                                <a key={i} className={style.active}>
                                    {data.name}
                                </a>
                            );
                        } else {
                            return (
                                <Link key={i} href={data.href} passHref>
                                    {data.name}
                                </Link>
                            );
                        }
                    })
                }
            </div>
        </div>
        // <div className={StyleClass(style.navlink)} id='static-header'>
        //     <Head>
        //         <title>
        //             {path[path.length - 1]}
        //         </title>

        //     </Head>
        //     <div className={style.headerbackground}>
        //         <div className={style.headerfixed}>
        //             <div className={style.title}>
        //                 LittleTealeaf
        //             </div>
        //             <div className={style.navigation}>
        //                 {navLinks.map(NavLink)}
        //             </div>
        //         </div>
        //     </div>


        //     <Script src="./assets/js/header-scroll.js" />
        // </div>
    )
}