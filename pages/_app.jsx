import Header from "components/header";
import "styles/globals.css";
import "styles/style.scss";
import "@primer/css/index.scss";
import "github-syntax-light/lib/github-light.css";
import Announcement from "components/announcement";

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
