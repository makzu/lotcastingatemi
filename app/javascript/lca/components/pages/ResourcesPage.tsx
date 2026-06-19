import React from 'react'

import BlockPaper from 'components/generic/BlockPaper.tsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.tsx'
import ResourcesText from 'Docs/resources.md?raw'

const ResourcesPage = () => (
  <BlockPaper>
    <MarkdownDisplay source={ResourcesText} />
  </BlockPaper>
)
export default ResourcesPage
