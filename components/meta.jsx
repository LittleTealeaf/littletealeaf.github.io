import Head from "next/head";

export default function Meta({ values, name, content }) {
  if (values == null) {
    return (
      <Head>
        <meta name={name} content={content} />
      </Head>
    );
  } else {
    return (
      <Head>
        {Object.keys(values).map((name, index) => (
          <meta key={index} name={name} content={values[name]} />
        ))}
      </Head>
    );
  }
}
