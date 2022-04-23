import Link from "next/link";
import React from "react";

const HEADER_HEIGHT = 60;

const Header = ({}) => (
  <>
    <ul
      className="sticky top-0 bg-black list-none text-white flex"
      style={{
        height: HEADER_HEIGHT,
        width: "100%",
        fontSize: "28px",
      }}
    >
      {require("assets/navigation.json").map((item, index) => (
        <li
          key={index}
          className="float-left transition-all bg-black hover:bg-gray-700 grow-[8] hover:grow-[9] text-center"
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
    <a
      href="https://github.com/LittleTealeaf/littletealeaf.github.io"
      className={"sticky float-left text-white bg-black"}
      style={{
        position: "fixed",
        bottom: "0px",
        right: "0px",
        padding: "0px 5px 0px 5px",
      }}
    >
      View on Github
    </a>
  </>
);

export default Header;