import React from 'react'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper'
import MarkdownDisplay from 'components/generic/MarkdownDisplay'
import { prettyFullExaltType } from 'utils/calculated'
import { Character } from 'types'
interface Props {
  character: Character
}

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
