import Head from "next/head";

interface TitleProps {
  text?: string;
}

const Title = ({ text }: TitleProps) => (
  <Head>
    <title>{text}</title>
  </Head>
);

export default Title;
