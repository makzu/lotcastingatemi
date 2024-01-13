import { VisibilityOff } from '@mui/icons-material'
import { Typography, Divider } from '@mui/material'

import RatingLine from '../../generic/ratingLine'
import BlockPaper from 'components/shared/BlockPaper'
import { Character } from 'types'
import { Intimacy } from 'types/shared'

interface Props {
  character: Character
  canEdit: boolean
}

const IntimacySummaryBlock = ({ character, canEdit }: Props) => {
  const intimacyMap = (p: Intimacy, index: number) =>
    p.hidden && !canEdit ? (
      <span key={index} />
    ) : (
      <Typography key={index} component="div">
        <RatingLine rating={p.rating} fillTo={3}>
          {p.hidden && <VisibilityOff />} {p.subject}
        </RatingLine>
        <Divider />
      </Typography>
    )

  const principles = character.principles.map(intimacyMap)
  const ties = character.ties.map(intimacyMap)

  return (
    <BlockPaper>
      <Typography variant="h6">Intimacies</Typography>

      <Typography variant="subtitle1">Principles</Typography>
      {principles}

      <Typography variant="subtitle1" style={{ marginTop: '0.5em' }}>
        Ties
      </Typography>
      {ties}
    </BlockPaper>
  )
}

export default IntimacySummaryBlock
