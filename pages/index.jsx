import { Github } from '../libs/api.js';
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
      resources: Resource.storeJSON('api/github/base',await Github.getAPI('https://api.github.com/'))
    }
  }
}
