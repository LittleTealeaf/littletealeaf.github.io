import Header from "../components/header";

// Styles
import "../styles/style.css";
import "@primer/css/index.scss"
import "github-syntax-light/lib/github-light.css"
import Announcement from "../components/announcement";

//Some thoughts: https://www.johanbleuzen.fr/blog/next-remove-clientside-javascript

//todo: create a stylesheet (maybe use sass or scss)
//https://www.w3schools.com/css/tryit.asp?filename=trycss_navbar_horizontal_responsive

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Announcement />
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
