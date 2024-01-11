import React from 'react'
import { Theme, createStyles, withStyles } from '@material-ui/core/styles'
import { WithStyles } from '@material-ui/styles'
// TODO: Replace with SVG icons or something?
const dot = {
  display: 'inline-block',
  color: 'transparent',
  overflow: 'hidden',
  width: '0.75em',
  height: '0.75em',
  borderRadius: '0.45em',
  border: '0.125em solid black',
  marginLeft: '1px',
}

const styles = (theme: Theme) =>
  createStyles({
    emptyDot: { ...dot, backgroundColor: theme.palette.background.paper },
    fullDot: { ...dot, backgroundColor: 'black' },
  })

interface Props extends WithStyles<typeof styles> {
  rating: number
  fillTo?: number
  dontFill?: boolean
}

function RatingDots(props: Props) {
  const emptyCount = (props.fillTo ?? 5) - props.rating
  const fc = new Array(props.rating).fill('●')
  const fullDots = fc.map((dot, index) => (
    <div key={index} className={props.classes.fullDot}>
      {dot}
    </div>
  ))
  let emptyDots = ''

  if (props.dontFill == null && emptyCount >= 0) {
    const ec = new Array(emptyCount).fill('○')
    emptyDots = ec.map((dot, index) => (
      <div key={index} className={props.classes.emptyDot}>
        {dot}
      </div>
    ))
  }

  return (
    <div aria-label={props.rating}>
      {fullDots}
      {emptyDots}
      {!props.dontFill && props.fillTo && props.rating > props.fillTo && (
        <strong> +</strong>
      )}
    </div>
  )
}

export default withStyles(styles)(RatingDots)
