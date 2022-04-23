import React from "react";
import Header from "libs/components/Header";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default MyApp;
