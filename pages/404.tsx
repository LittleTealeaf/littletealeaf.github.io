import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, ThemeOptions } from "@mui/material";
import Script from "next/script";

// export const config = {
//   unstable_runtimeJS: false,
// };

const theme = createTheme({
  palette: {
    primary: {
      main: '#33192B',
    },
    secondary: {
      main: '#0c326b',
    },
  },
})

export default function Content() {
  return (
    <>
    <Script id="update-url" strategy="lazyOnload">
      {`document.getElementById('url').innerHTML = window.location.href`}
    </Script>
      <ThemeProvider theme={theme}>
        <div 
          style={{
            background: `url(${require("assets/images/404.jpg")}) no-repeat top center`,
            backgroundSize: "cover !important",
            WebkitBackgroundSize: "cover !important",
            height: "100vh",
            width: "100%",
            color: "white",
            textAlign: "center",
            display: "block",
          }}
        >
          <div
            style={{
              textShadow: '2px 2px rgba(0,0,0,0.5)',
              display: "inline-block",
              verticalAlign: "middle",
              margin: "0 auto",
              width: "60%",
              paddingBottom: "30px",
              marginTop: 250,
            }}
          >
            <div
              style={{
                fontSize: "18px",
                margin: "0",
                fontFamily: "sans-serif",
              }}
            >
              <h1
                style={{
                  fontSize: "40px",
                }}
              >
                {"Oh No! Page not found!"}
              </h1>
              <h3
                style={{
                  fontSize: "20px",
                }}
              >
                Check the url, it might be incorrect
              </h3>
              <p id="url"></p>
              <p>In the meantime, feel free to hang around, or return to the main page!</p>
              <Button href="/" color="secondary" variant="contained">
                Back to littletealeaf.github.io
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
