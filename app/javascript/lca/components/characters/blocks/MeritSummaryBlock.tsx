import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import RatingLine from '@lca/components/generic/RatingLine.tsx'
import type { Character, Merit } from '@lca/types'

const styles = (theme) => ({
  meritLine: {
    ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  meritName: {
    ...theme.typography.caption,
  },
})

type Props = { character: Character; merits: Merit[]; classes: Object }
export function MeritSummaryBlock(props: Props) {
  const { classes } = props

  const merits = props.merits.map((merit) => (
    <div key={merit.id} className={classes.meritLine}>
      <RatingLine rating={merit.rating} dontFill merit>
        {merit.label || merit.merit_name}
        {merit.label && (
          <span className={classes.meritName}> ({merit.merit_name})</span>
        )}
      </RatingLine>
      <Divider />
    </div>
  ))

  return <div>{merits}</div>
}

export default withStyles(styles)(MeritSummaryBlock)
