import {MarkdownAsset} from 'components/markdown'
import {Index} from 'libs/resources'

export default function Page({}) {
    return (<div style={{
        padding: '50px'
    }}>
        {/* <Snippet name='markdowntest' /> */}
        <MarkdownAsset asset={Index.markdown.debug.cache} />
    </div>)
}
