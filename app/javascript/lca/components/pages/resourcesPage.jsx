// @flow
import React from 'react'

import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import ResourcesText from 'Docs'

const ResourcesPage = () => (
  <BlockPaper>
    <MarkdownDisplay source={ResourcesText} />
  </BlockPaper>
)
export default ResourcesPage
