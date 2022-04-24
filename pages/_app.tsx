import React from "react";
import Header from "libs/components/Header";

/*
https://nextjs.org/docs/advanced-features/dynamic-import
*/

const MyApp = ({ Component, pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default MyApp;
