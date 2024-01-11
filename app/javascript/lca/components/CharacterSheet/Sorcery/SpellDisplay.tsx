import * as React from 'react'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import BlockPaper from 'components/generic/blockPaper.jsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import SecondaryInfo from 'components/shared/SecondaryInfo'
import { Spell } from 'types'

const useStyles = makeStyles({
  capitalize: {
    textTransform: 'capitalize',
  },
})

interface Props {
  spell: Spell
}

const SpellDisplay = ({ spell }: Props) => {
  const classes = useStyles()

  return (
    // @ts-expect-error I suspect the MUI v5 migration will fix this
    <BlockPaper>
      <Typography variant="h6">
        {spell.name}
        {spell.control && ' (Control Spell)'}
      </Typography>
      <Typography variant="caption" className={classes.capitalize}>
        {spell.circle} circle
      </Typography>
      <div>
        <strong>Cost: </strong>
        {spell.cost}
      </div>
      {spell.keywords.length > 0 && (
        <div className={classes.capitalize}>
          <strong>Keywords: </strong>
          {spell.keywords.join(', ')}
        </div>
      )}
      <div>
        <strong>Duration: </strong>
        {spell.duration}
      </div>

      <MarkdownDisplay source={spell.body} />

      {spell.ref && <SecondaryInfo>Reference: {spell.ref}</SecondaryInfo>}
    </BlockPaper>
  )
}

export default SpellDisplay
