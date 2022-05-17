export default function Home() {
  return (
    <>
      <div>Hello world</div>
    </>
  );
}

export function getStaticProps({ params }) {
  return {
    props: {},
  };
}
