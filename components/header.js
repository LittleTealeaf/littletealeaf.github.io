import Head from 'next/head'
import Link from 'next/link'

import { Navigation as navLinks } from '../libs/assets'


export default function Header({ router, title: page_title }) {
    return (
        <div>
            <Head>
                <title>
                    {page_title}
                </title>
            </Head>
            <div className='bg-slate-700 ' style={{
                width: '100%',
                padding: '0px 0px 5px 0px'
            }}>
                <div className='bg-slate-500 flex flex-row'>
                <div className='flex-grow'>
                        ITEM A
                    </div><div className='flex-grow'>
                        ITEM A
                    </div><div className='flex-grow'>
                        ITEM A
                    </div><div className='flex-grow'>
                        ITEM A
                    </div><div className='flex-grow'>
                        ITEM A
                    </div><div className='flex-grow'>
                        ITEM A
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
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
        */