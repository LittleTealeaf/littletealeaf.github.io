import Cache from '../libs/caches'

export default function Home() {
  return (
    
    <div>
      
      WARNING, THIS WEBSITE IS UNDER DEVELOPMENT. ALSO, I AM A BIRD
    </div>
  )
}

export async function getStaticProps(context) {
  const cache = new Cache('javascript-test');
  cache.store('test','VALUE HERE');
  return {
    props: {}, // will be passed to the page component as props
  }
}