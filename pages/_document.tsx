// import { Head, Html, Main, NextScript } from "next/document";

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render = () => (
    <Html>
      <Head />
      <body
        style={{
          overflowX: "hidden",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
