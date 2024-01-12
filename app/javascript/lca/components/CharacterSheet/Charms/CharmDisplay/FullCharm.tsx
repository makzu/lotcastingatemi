import BlockPaper from 'components/generic/blockPaper'
import { Charm } from 'types'

interface Props {
  charm: Charm
}

const FullCharmDisplay = ({ charm }: Props) => {
  return <BlockPaper>{charm.name}</BlockPaper>
}

export default FullCharmDisplay
