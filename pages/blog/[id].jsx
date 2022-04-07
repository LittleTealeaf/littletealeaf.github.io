import hljs from "highlight.js";
import Head from "next/head";
import { getGenerated, index } from "../../libs/resources";
const html_parser = require('html-react-parser');
const markdown_it = require('markdown-it')({
    highlight: (str,lang) => {
        if(lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch(__) {}
        }
        return '';
    }
});


export async function getStaticPaths() {
    return {
        paths: Object.keys(index.pages.blogs).map((slug) => ({
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
    const blog = getGenerated(index.pages.blogs[id]);

    return (
        <>
        <Head>
            {blog.title != null ? <title>{blog.title}</title> : ""}
        </Head>
        <div>
            {html_parser.default(markdown_it.render(blog.content))}
        </div>
        </>
    )
}