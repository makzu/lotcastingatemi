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

function RatingLine({ classes, children, rating, fillTo, dontFill, merit }) {
  return <div className={ classes.wrap }>
    <div className={ classes.label }>
      { children }
    </div>
    { merit && rating > 5 &&
      <div className={ classes.na }>
        N/A
      </div>
    }
    { !(merit && rating > 5) &&
      <RatingDots rating={ rating } fillTo={ fillTo } dontFill={ dontFill } />
    }
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
