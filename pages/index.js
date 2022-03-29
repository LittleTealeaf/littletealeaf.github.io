

import { useRouter } from 'next/router'
import { load, save } from '../libs/cache'

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

  save('testb', ['I am a dummy text']);

  return {
    props: {
      item: load('testb')
    }
  }
}
