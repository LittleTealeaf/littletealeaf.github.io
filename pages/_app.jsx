import Header from "../components/header";

// Styles
import "../styles/style.css";
import "@primer/css/index.scss"
import "github-syntax-light/lib/github-light.css"

//Some thoughts: https://www.johanbleuzen.fr/blog/next-remove-clientside-javascript

//todo: create a stylesheet (maybe use sass or scss)
//https://www.w3schools.com/css/tryit.asp?filename=trycss_navbar_horizontal_responsive

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <center>
        <div
          style={{
            borderRadius: "100px",
            padding: "10px",
            width: "70%",
            background: "pink",
          }}
        >
          {
            "Hello viewer! Yes, this website is currently in development. Yes, I have decided to develop on production. Why? Because I can, and because it's easier for me. Feel free to check on back to see the progress of my website, and hopefully eventually the final result! I think at that point, I'll work on NOT testing on production...  Or maybe I will... :)"
          }
        </div>
      </center>
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
