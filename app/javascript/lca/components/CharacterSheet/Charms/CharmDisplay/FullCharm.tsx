import * as React from 'react'

import BlockPaper from 'components/generic/blockPaper'
import { Charm } from 'types'

interface Props {
  charm: Charm
}

const FullCharmDisplay = ({ charm }: Props) => {
  // @ts-expect-error MUI v5 should fix this
  return <BlockPaper>{charm.name}</BlockPaper>
}

export default FullCharmDisplay
