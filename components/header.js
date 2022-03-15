import Head from 'next/head'
import Link from 'next/link'

import style from '../styles/header.module.css'
import navLinks from '../resources/navigation.json'

console.log(navLinks);

export default function Header({home}) {
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
                    navLinks.map((data,id) => (
                        <Link key={id} href={data.href}>
                            {data.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}