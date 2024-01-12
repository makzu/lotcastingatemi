import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import BlockPaper from 'components/shared/BlockPaper'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'
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
