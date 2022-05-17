import { client } from "libs/github"



export default function Home() {
  return (
    <>
    <div>
      Hello world
    </div>
    </>
  )
}


export function getStaticProps({params}) {
  console.log(client)
  return {
    props: {}
  }
}
