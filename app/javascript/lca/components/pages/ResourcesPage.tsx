import React from 'react'

import BlockPaper from 'components/generic/blockPaper'
import MarkdownDisplay from 'components/generic/MarkdownDisplay'
import ResourcesText from 'Docs/resources.md?raw'

const ResourcesPage = () => (
  <BlockPaper>
    <MarkdownDisplay source={ResourcesText} />
  </BlockPaper>
)
export default ResourcesPage
