import Head from 'next/head'
import Link from 'next/link'

import { Navigation as navLinks } from '../libs/assets'


export default function Header({ router, title: page_title }) {

    const content = (
        <div className='fixed left-0 top-0' style={{
            width: '100%'
        }}>
            <Head>
                <title>
                    {page_title}
                </title>
            </Head>
            <div className='bg-slate-500 flex flex-wrap object-bottom' style={{
                alignItems: 'end',
                padding: '0px 0px 10px 0px'
            }}>
                <div className='text-3xl' style={{
                    padding: '5px 100px 0px 20px'
                }}>
                    Thomas Kwashnak
                </div>
                {
                    navLinks.map((link, index) => {
                        const active = (link.href != '/' && router.asPath.includes(link.href)) || link.href == router.asPath;

                        return (

                            <Link key={index} href={link.href} passHref >
                                <div className='flex-grow text-center align-text-bottom text-xl bg-transparent transition duration-300 hover:bg-slate-300 hover:text-black' style={{
                                    padding: '0px 0px 3px 0px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>
                                    {
                                        link.name
                                    }
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );

    return (
        <div>
            {content}
            <div style={{
                height: '50px'
            }}>

            </div>
        </div>
    );
}
// /*
// https://www.section.io/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/
// <nav class="bg-white shadow-lg">
//         <div class="max-w-6xl mx-auto px-4">
//             <div class="flex justify-between">
//                 <div class="flex space-x-7">
//                     <div>
//                         <a href="#" class="flex items-center py-4 px-2">
//                             <img src="logo.png" alt="Logo" class="h-8 w-8 mr-2" />
//                             <span class="font-semibold text-gray-500 text-lg"
//                                 >Navigation</span
//                             >
//                         </a>
//                     </div>
//                     <div class="hidden md:flex items-center space-x-1">
//                         <a
//                             href=""
//                             class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
//                             >Home</a
//                         >
//                         <a
//                             href=""
//                             class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
//                             >Services</a
//                         >
//                         <a
//                             href=""
//                             class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
//                             >About</a
//                         >
//                         <a
//                             href=""
//                             class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
//                             >Contact Us</a
//                         >
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </nav>
//     */

// /*
// <div className={style.title}>
//                 <h1>Thomas Kwashnak</h1>
//                 <h2>LittleTealeaf</h2>
//             </div>
//             <div className={style.navigation}>
//                 {
//                     navLinks.map((data, i) => {

//                         const active = (data.href != '/' && router.asPath.includes(data.href)) || data.href == router.asPath;
//                         return (
//                             <Link key={i} href={data.href} passHref>
//                                 {
//                                     active ? (
//                                         <a className={style.active} style={{
//                                             'cursor': 'default'
//                                         }}>{data.name}</a>
//                                     ) : (
//                                         data.name
//                                     )
//                                 }
//                             </Link>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//         */