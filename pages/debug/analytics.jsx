import {MarkdownAsset, RenderMarkdown} from 'components/markdown'
import {getGenerated, Index} from 'libs/resources'

export default function Page({}) {

  return (
    <>
    <RenderMarkdown content={getGenerated(Index.analytics)} />
    </>
  );
}
