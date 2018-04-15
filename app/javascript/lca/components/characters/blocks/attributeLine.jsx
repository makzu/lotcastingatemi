import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import RatingLine from '../../generic/ratingLine.jsx'
import { isCasteAttribute, isFavoredAttribute } from '../../../utils/calculated'

const styles = theme => ({
  attributeName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  attributeFavored: { ...theme.typography.caption,
  },
})

function AttributeLine(props) {
  const { rating, attribute, character, pools, classes } = props
  const caste = isCasteAttribute(character, attribute)
  const favored = isFavoredAttribute(character, attribute)
  const excellency = pools.excellencyAbils.includes('*') || pools.excellencyAbils.includes(attribute)

  return <div>
    <RatingLine rating={ rating }>
      <span className={ classes.attributeName }>
        { attribute }
      </span>
      <span className={ classes.attributeFavored }>
        { excellency && ' *' }
        { caste && ' (c)' }
        { favored && ' (f)' }
      </span>
    </RatingLine>

    <Divider />
  </div>
}

AttributeLine.propTypes = {
  attribute: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  pools: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AttributeLine)
