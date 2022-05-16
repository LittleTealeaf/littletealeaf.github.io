import { client } from "libs/githubapi"



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
