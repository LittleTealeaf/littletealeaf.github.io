import Head from "next/head";

export default function Meta({ values, name, content }) {
  if (values == null) {
    return (
      <Head>
        <meta key={name} name={name} content={content} />
      </Head>
    );
  } else {
    return (
      <Head>
        {Object.keys(values).map((name) => (
          <meta key={name} name={name} content={values[name]} />
        ))}
      </Head>
    );
  }
}
