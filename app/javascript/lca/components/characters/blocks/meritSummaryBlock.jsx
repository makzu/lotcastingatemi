import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import RatingDots from '../../generic/ratingDots.jsx'
import { fullMerit, fullChar } from '../../../utils/propTypes'

const styles = theme => ({
  meritLine: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  meritName: { ...theme.typography.caption,
  }
})

export function MeritSummaryBlock(props) {
  const { classes } = props

  const merits = props.merits.map((merit) =>
    <div key={ merit.id } className={ classes.meritLine }>
      { merit.name || merit.merit_name }
      { merit.name &&
        <span className={ classes.meritName }> ({ merit.merit_name })</span>
      }
      <RatingDots rating={merit.rating} dontFill />
      <Divider />
    </div>
  )

  return <div>
    { merits }
  </div>
}
MeritSummaryBlock.propTypes = {
  character: PropTypes.shape(fullChar).isRequired,
  merits: PropTypes.arrayOf(PropTypes.shape(fullMerit)).isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(MeritSummaryBlock)
