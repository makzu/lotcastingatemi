import withStyles from '@mui/styles/withStyles'
import Divider from '@mui/material/Divider'

import RatingLine from 'components/generic/ratingLine.jsx'
import type { Character, fullMerit } from 'utils/flow-types'

const styles = (theme) => ({
  meritLine: {
    ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  meritName: {
    ...theme.typography.caption,
  },
})

interface Props {
  character: Character
  merits: fullMerit[]
  classes: Record<string, $TSFixMe>
}
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
