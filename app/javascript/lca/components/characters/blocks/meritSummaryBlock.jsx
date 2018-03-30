import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import RatingLine from '../../generic/ratingLine.jsx'
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
      <RatingLine rating={ merit.rating } dontFill merit>
        { merit.label || merit.merit_name }
        { merit.label &&
          <span className={ classes.meritName }> ({ merit.merit_name })</span>
        }
      </RatingLine>
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
