import Head from "next/head";
import Link from 'next/link'

const HEADER_HEIGHT = 70;

export default function Header() {

  return (
    <>
      <Head>
        {require("../assets/metas.json").map((item, index) => (
          <meta key={index} name={item.name} content={item.content} />
        ))}
      </Head>
      <img src={require('../assets/images/header.jpg')} alt="header image" style={{
        width: '100%'
      }}/>
      <ul
        className="sticky top-0"
        style={{
          height: HEADER_HEIGHT,
          width: "100%",
          background: 'black',
          listStyleType: 'none',
          color: 'white'
        }}
      >
        {require("../assets/navigation.json").map((item,index) => (
          <li key={index} style={{
            float: 'left'
          }}>
            <Link href={item.href}>
            <p className="cursor-pointer">{item.name}</p>
            </Link>
          </li>
        ))}

      </ul>
      <div
        style={{
          height: HEADER_HEIGHT,
        }}
      />
    </>
  );
}
