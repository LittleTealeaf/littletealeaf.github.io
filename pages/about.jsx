import Markdown from "../components/markdown";
import { index } from "../libs/resources";
import { getGenerated } from "../libs/resources";

export default function Page({ }) {
    return (
        <>
            <Markdown content={getGenerated(index.snippets.aboutme)} />
        </>
    );
}
