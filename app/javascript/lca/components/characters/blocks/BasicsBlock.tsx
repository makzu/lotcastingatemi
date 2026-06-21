import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import type { Character } from '@lca/types'
import { prettyFullExaltType } from '@lca/utils/calculated'

type Props = { character: Character }
const BasicsBlock = ({ character }: Props) => (
  <BlockPaper>
    <Typography variant="h5">{character.name}</Typography>

    <Typography variant="subtitle1">
      Essence {character.essence} {prettyFullExaltType(character)}
    </Typography>

    <MarkdownDisplay source={character.description} />
  </BlockPaper>
)

export default BasicsBlock
