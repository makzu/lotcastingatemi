// @flow
import Typography from '@mui/material/Typography'

import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import { prettyFullExaltType } from 'utils/calculated'

import type { Character } from 'utils/flow-types'

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
