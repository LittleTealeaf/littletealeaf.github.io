import {useRouter} from 'next/router'

export default function Home({router, props}) {
  

  return (
    
    <div>
      standard blog post
    </div>
  )
}

export async function getStaticProps(context) {


  return {
    props: {
      
    }
  }
}
