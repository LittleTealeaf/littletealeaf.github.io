import Head from "next/head";

export const config = {
  unstable_runtimeJS: false,
};

const Content = ({}) => (
  <>
    <Head>
      <title>Thomas Kwashnak</title>
    </Head>
    <div
      style={{
        background: `url(${require("assets/images/background.png")})`,
        width: "100%",
        height: "100vh",
        color: "white",
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
        justifyContent: 'center',
      }}
    >

      <div style={{
        height: '0%',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'cursive',
        fontSize: '100px',
        flexGrow: 1,
      }}>
        <p>Thomas Kwashnak</p>
      </div>

    </div>
  </>
);

export default Content;
