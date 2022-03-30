

import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'
import { Github } from '../libs/api.js';
import { CacheManager, getPath } from '../libs/resources.js'


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
  CacheManager.store('api','vscode','values');
  

  return {
    props: {
      item: await Github.getAPI('https://api.github.com/user')
    }
  }
}
