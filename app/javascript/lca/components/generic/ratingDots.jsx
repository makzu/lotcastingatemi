import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

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

const styles = theme => ({
  emptyDot: { ...dot,
    backgroundColor: theme.palette.background.paper,
  },
  fullDot: { ...dot,
    backgroundColor: 'black',
  },
})

function RatingDots(props) {
  const emptyCount = ( props.fillTo || 5 ) - props.rating

  const fc = new Array(props.rating).fill('●')
  const fullDots = fc.map((dot, index) =>
    <div key={ index } className={ props.classes.fullDot }>{ dot }</div>
  )

  let emptyDots = ''
  if (props.dontFill == null && emptyCount >= 0) {
    let ec = new Array(emptyCount).fill('○')
    emptyDots = ec.map((dot, index) =>
      <div key={ index } className={ props.classes.emptyDot }>{ dot }</div>
    )
  }
  return <div>
    { fullDots }
    { emptyDots }
    { !props.dontFill && props.fillTo && props.rating > props.fillTo && <strong> +</strong> }
  </div>
}

RatingDots.propTypes = {
  rating: PropTypes.number.isRequired,
  fillTo: PropTypes.number,
  dontFill: PropTypes.bool,
  classes: PropTypes.object,
}

export default withStyles(styles)(RatingDots)
