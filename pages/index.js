import Head from 'next/head'
import Header from '../components/header'

import {useRouter} from 'next/router'

export default function Home({router}) {
  return (
    
    <div>
      <Header router={router}/>
      WARNING, THIS WEBSITE IS UNDER DEVELOPMENT. ALSO, I AM A BIRD
    </div>
  )
}
