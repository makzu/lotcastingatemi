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
  const { rating, attribute, character, classes } = props
  const caste = isCasteAttribute(character, attribute)
  const favored = isFavoredAttribute(character, attribute)

  return <div>
    <RatingLine rating={ rating }>
      <span className={ classes.attributeName }>
        { attribute }
      </span>
      <span className={ classes.attributeFavored }>
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
  character: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(AttributeLine)
