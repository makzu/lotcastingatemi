import * as React from 'react'
import { Theme, createStyles, withStyles } from '@material-ui/core/styles'
import RatingDots from './ratingDots'
import { WithStyles } from '@material-ui/styles'

const styles = (theme: Theme) =>
  createStyles({
    //eslint-disable-line no-unused-vars
    wrap: {
      display: 'flex',
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      flexWrap: 'wrap',
    },
    label: {
      flex: 1,
    },
  })

interface Props extends WithStyles<typeof styles> {
  rating: number
  fillTo?: number
  dontFill?: boolean
  merit?: boolean
  children: React.ReactNode
}

function RatingLine({
  classes,
  children,
  rating,
  fillTo,
  dontFill,
  merit,
}: Props) {
  return (
    <div className={classes.wrap}>
      <div className={classes.label}>{children}</div>
      {merit && rating > 5 && <div>N/A</div>}
      {!(merit && rating > 5) && (
        <RatingDots rating={rating} fillTo={fillTo} dontFill={dontFill} />
      )}
    </div>
  )
}

export default withStyles(styles)(RatingLine)
