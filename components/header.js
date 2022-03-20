import Head from 'next/head'
import Link from 'next/link'
// import Script from 'next/script'

import style from '../styles/header.module.css'
import { Navigation as navLinks } from '../libs/assets'
// import StyleClass from '../libs/styleutil'


export default function Header({ router, title: page_title }) {
    return (
        <div className={style.header}>
            <Head>
                <title>
                    {page_title}
                </title>
            </Head>
            <div className={style.title}>
                <h1>Thomas Kwashnak</h1>
                <h2>LittleTealeaf</h2>
            </div>
            <div className={style.navigation}>
                {
                    navLinks.map((data, i) => {

                        const active = (data.href != '/' && router.asPath.includes(data.href)) || data.href == router.asPath;
                        return (
                            <Link key={i} href={data.href} passHref>
                                {
                                    active ? (
                                        <a className={style.active} style={{
                                            'cursor': 'default'
                                        }}>{data.name}</a>
                                    ) : (
                                        data.name
                                    )
                                }
                            </Link>
                        )
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