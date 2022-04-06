import Head from "next/head";
import { getGenerated, index } from "../../libs/resources";
const html_parser = require('html-react-parser');


export async function getStaticPaths() {
    return {
        paths: Object.keys(getGenerated(index.pages.blogs)).map((slug) => ({
            params: {
                id: slug
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({params}) {
    return {
        props: {
            id: params.id
        }
    }
}

export default function Page({ id}) {
    const blog = getGenerated(getGenerated(index.pages.blogs)[id]);

    return (
        <>
        <Head>
            {blog.title != null ? <title>{blog.title}</title> : ""}
        </Head>
        <div>
            {html_parser(blog.content)}
        </div>
        </>
    )
}