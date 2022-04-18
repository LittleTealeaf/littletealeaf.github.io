import {MarkdownAsset} from 'components/markdown'
import {getGenerated, Index} from 'libs/resources'

export default function Page({}) {

  return (
    <>
    <MarkdownAsset asset={Index.markdown.debug.analytics} />
    </>
  );
}
