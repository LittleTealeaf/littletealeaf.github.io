import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { CacheManager, getPath, Resource } from '../libs/resources.js';


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
