import React from "react";
import Header from "libs/header";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default MyApp;
