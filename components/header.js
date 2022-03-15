import Head from 'next/head'
import Link from 'next/link'

import style from '../styles/header.module.css'
import navLinks from '../resources/navigation.json'

const links = navLinks.map((data, i) => (
    <Link key={i} href={data.href}>
        <div className={style.navlink}>
            {data.name}
        </div>
    </Link>
));


export default function Header({ path }) {
    console.log(path);
    return (

        <div className={style.header}>
            <Head>
                <title>
                    {
                        path[path.length - 1]
                    }
                </title>
            </Head>

            <center className={style.centered}>
                <div className={style.navigation}>
                    {links}
                </div>
            </center>
        </div>
    )
}