import { ThemeProvider } from "@emotion/react";
import { Button, createTheme } from "@mui/material";
import Head from "next/head";
import Script from "next/script";
import css from "styles/pages/404.module.scss";

// export const config = {
//   unstable_runtimeJS: false,
// };

const theme = createTheme({
  palette: {
    primary: {
      main: "#195c86",
    },
    secondary: {
      main: "#0c326b",
    },
  },
});

export default function Content() {
  return (
    <>
      <Head>
        <title>404 | Page not found</title>
      </Head>
      <Script id="update-url" strategy="lazyOnload">
        {`document.getElementById('url').innerHTML = window.location.href`}
      </Script>
      <ThemeProvider theme={theme}>
        <div
          className={css.background}
          style={{
            background: `url(${require("assets/images/404.jpg")}) no-repeat top center`,
            WebkitBackgroundSize: "cover !important",
          }}
        >
          <div className={css.content}>
            <h1>{"Oh No! Page not found!"}</h1>
            <h3>Check the url, it might be incorrect</h3>
            <p id="url"></p>
            <p>In the meantime, feel free to hang around, or return to the main page!</p>
            <Button href="/" color="primary" variant="contained">
              Back to littletealeaf.github.io
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
