import Head from "next/head";
import Link from "next/link";

const HEADER_HEIGHT = 60;

export default function Header() {
  return (
    <>
      <Head>
        {require("../assets/metas.json").map((item, index) => (
          <meta key={index} name={item.name} content={item.content} />
        ))}
      </Head>
      <img
        src={require("../assets/images/header.jpg")}
        alt="header image"
        style={{
          width: "100%",
        }}
      />
      <ul
        className="sticky top-0 bg-black list-none text-white flex"
        style={{
          height: HEADER_HEIGHT,
          width: "100%",
          fontSize: "28px",
        }}
      >
        {require("../assets/navigation.json").map((item, index) => (
          <li
            key={index}
            className="float-left transition-all bg-black hover:bg-gray-700 grow-[3] hover:grow-[4] text-center"
            style={{
              padding: "14px 16px",
            }}
          >
            <Link href={item.href} passHref>
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
