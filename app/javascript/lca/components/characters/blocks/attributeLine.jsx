import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import RatingDots from '../../generic/ratingDots.jsx'

const styles = theme => ({
  attributeName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
})

function AttributeLine(props) {
  const { classes } = props
  return <div>
    <span className={ classes.attributeName }>
      { props.attribute }:
    </span>

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>
}

AttributeLine.propTypes = {
  attribute: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(AttributeLine)
