import React from 'react'

import { VisibilityOff } from '@material-ui/icons'
import { Typography, Divider } from '@material-ui/core'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingLine from '../../generic/ratingLine.jsx'
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
