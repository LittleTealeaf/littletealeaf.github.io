import { AppProps } from "next/app";
import "styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {process.env.NODE_ENV == "production" ? (
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          margin: "auto",
          textAlign: "center",
          alignSelf: "center",
          backgroundColor: "white",
          color: "black",
        }}
      >
        {"Please note, this website is currently in development, and some features may not be functional or implemented"}
      </div>
    ) : (
      <></>
    )}
    <Component {...pageProps} />
  </>
);

export default App;
