import BlockPaper from '@/components/shared/BlockPaper'
import { type Charm } from '@/types'

interface Props {
  charm: Charm
}

const FullCharmDisplay = ({ charm }: Props) => {
  return <BlockPaper>{charm.name}</BlockPaper>
}

export default FullCharmDisplay
