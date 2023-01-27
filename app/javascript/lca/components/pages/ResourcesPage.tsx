import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'
import ResourcesText from 'Docs/resources.md'

const ResourcesPage = () => (
  <BlockPaper>
    <MarkdownDisplay source={ResourcesText} />
  </BlockPaper>
)
export default ResourcesPage
