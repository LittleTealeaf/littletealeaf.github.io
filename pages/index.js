

import { useRouter } from 'next/router'
import { Cache, getPath } from '../libs/resources.js'


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

  // Cache.store('api','test','VALUE');
  Cache.store('api','vscode','values');

  return {
    props: {
      item: Cache.get('api','vscode')
    }
  }
}
