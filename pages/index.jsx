import { Github } from '../archive/libs3/api.js';
import { Resource } from '../libs/resources.js';


export default function Home({ router, props }) {


  return (
    <>
      <div>
        WARNING, THIS WEBSITE IS UNDER DEVELOPMENT. ALSO, I AM A BIRD
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
