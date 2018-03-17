import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import ResourceEditor from './resourceEditor.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/ratingField.jsx'

import { WILLPOWER_MAX } from '../../../utils/constants.js'

const styles = theme => ({
  separator: { ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
})

function WillpowerEditor(props) {
  const { character, onRatingChange, classes } = props

  return <BlockPaper>
    <Typography variant="title">Willpower:</Typography>

    <div>
      <RatingField trait="willpower_temporary" value={ character.willpower_temporary }
        label="Current" margin="dense" narrow
        onChange={ onRatingChange }
      />
      <span className={ classes.separator }>
        /
      </span>
      <RatingField trait="willpower_permanent" value={ character.willpower_permanent }
        label="Total" max={ WILLPOWER_MAX } margin="dense" narrow
        onChange={ onRatingChange }
      />
    </div>

    { character.type != 'Character' &&
      <ResourceEditor character={ character } onChange={ onRatingChange } />
    }
  </BlockPaper>
}
WillpowerEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onRatingChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(WillpowerEditor)
