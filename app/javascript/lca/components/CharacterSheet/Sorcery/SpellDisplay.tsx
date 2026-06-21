import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import SecondaryInfo from '@lca/components/shared/SecondaryInfo'
import type { Spell } from '@lca/types'

const useStyles = makeStyles({
  capitalize: {
    textTransform: 'capitalize',
  },
})

interface Props {
  spell: Spell
}

export const SpellSummaryBlock = () => <></>

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
