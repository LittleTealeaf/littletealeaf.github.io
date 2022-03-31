import { Generated } from "../libs/resources.js";


export default function Home({ router, props }) {
  const data = Generated.load('home/data');
  console.log(data);

  return (
    <>
      <div>
        WARNING, THIS WEBSITE IS UNDER DEVELOPMENT. ALSO, I AM A BIRD
      </div>
    </>
  )
}

export async function getStaticProps(context) {

  const data = {
    test: {
      moreTest: true,
      data: "string"
    }
  };
  const path = 'home/data';
  Generated.storeJSON(path,data);
  
  return {
    props: {
    }
  }
}
