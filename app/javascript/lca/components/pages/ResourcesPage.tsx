import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import ResourcesText from 'Docs/resources.md'

const ResourcesPage = () => (
  <BlockPaper>
    <MarkdownDisplay source={ResourcesText} />
  </BlockPaper>
)
export default ResourcesPage
