import { Generated } from "../libs/resources.js";


export default function Home({ router, props }) {
  const data = Generated.load('home/data');
  console.log(data);

  return (
    <>
      <div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  
  return {
    props: {
    }
  }
}
