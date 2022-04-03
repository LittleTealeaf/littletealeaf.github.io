import Head from 'next/head'

export default function Header({}) {
  return (
    <>
      <Head>
        {
          require('../assets/metas.json').map((item,index) => (
            <meta key={index} name={item.name} content={item.content} />
          ))
        }
      </Head>
      <div>Headers are cool</div>
    </>
  );
}
