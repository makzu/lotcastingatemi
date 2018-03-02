import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import RatingLine from '../../generic/ratingLine.jsx'

const styles = theme => ({
  attributeName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
})

function AttributeLine(props) {
  const { classes } = props
  return <div>
    <RatingLine rating={ props.rating }>
      <span className={ classes.attributeName }>
        { props.attribute }:
      </span>
    </RatingLine>

    <Divider />
  </div>
}

AttributeLine.propTypes = {
  attribute: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(AttributeLine)
