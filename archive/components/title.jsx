import Head from "next/head";

export default function Title({ content }) {
  return (
    <Head>
      <title key="title">{content}</title>
    </Head>
  );
}
