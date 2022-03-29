

import { useRouter } from 'next/router'
import { getPath } from '../libs/resources.js'

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

  console.log(getPath('cache','python'));

  return {
    props: {
      item: 'null'
    }
  }
}
