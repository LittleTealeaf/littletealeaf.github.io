// import { Head, Html, Main, NextScript } from "next/document";

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render = () => (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
