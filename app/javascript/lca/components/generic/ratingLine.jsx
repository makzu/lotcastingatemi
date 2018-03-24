import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import RatingDots from './ratingDots.jsx'

const styles = theme => ({ //eslint-disable-line no-unused-vars
  wrap: {
    display: 'flex',
    marginBottom: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit / 2,
    flexWrap: 'wrap',
  },
  label: {
    flex: 1,
  },
})

function RatingLine(props) {
  const { classes } = props

  return <div className={ classes.wrap }>
    <div className={ classes.label }>
      { props.children }
    </div>
    <RatingDots rating={ props.rating } fillTo={ props.fillTo } dontFill={ props.dontFill } />
  </div>
}

RatingLine.propTypes = {
  rating: PropTypes.number.isRequired,
  fillTo: PropTypes.number,
  dontFill: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object,
}

export default withStyles(styles)(RatingLine)
