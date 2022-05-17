import { createTheme, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import 'styles/globals.scss';



const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
  </>
);

export default App;
