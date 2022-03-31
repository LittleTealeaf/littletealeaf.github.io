import matter from "gray-matter"
import { Assets } from "../../libs/resources"
import { readdirSync } from "fs"

export default function Home() {

    return (<>
    
    </>)
}

export async function getStaticPaths() {
    return {
        paths: readdirSync('assets/blogs').map(file => (
            {
                params: {
                    id: file.replace(/\.[^/.]+$/, "")
                }
            }
        )),
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const data = matter(Assets.readAsset(`blogs/${params.id}.md`));
    console.log(data);

    return {
        props: {

        }
    }
}