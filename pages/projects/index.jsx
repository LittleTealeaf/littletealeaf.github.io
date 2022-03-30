import { useRouter } from "next/router";

export default function Home({ router, props }) {
  return (
    <>
      <div>This is the home page</div>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
