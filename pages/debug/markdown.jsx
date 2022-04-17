import {MarkdownAsset, Snippet} from 'components/markdown'
import {Index} from 'libs/resources'

export default function Page({}) {
    return (
        <div style={{
            padding: '50px'
        }}>
            {/* <Snippet name='markdowntest' /> */}
            <MarkdownAsset asset={Index.markdown.snippets.markdowntest} />
        </div>
    )
}
