import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import HealthLevelBoxes from '../../generic/HealthLevelBoxes.jsx'
import RatingField from '../../generic/RatingField.jsx'

const styles = theme => ({
  subheading: {
    marginTop: theme.spacing.unit,
  },
  separator: { ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
  healthBoxesWrap: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
})

function HealthLevelEditor(props) {
  const { character, penalties, onRatingChange, classes } = props

  return <BlockPaper>
    <Typography variant="title">
      Health
    </Typography>

    <div className={ classes.healthBoxesWrap }>
      <HealthLevelBoxes character={ character } />
      <Typography>
        Current wound penalty: -{ penalties.wound }
      </Typography>
    </div>

    <Typography variant="subheading" className={ classes.subheading }>
      Damage:
    </Typography>
    <div>
      <RatingField trait="damage_bashing" value={ character.damage_bashing }
        label="Bashing" margin="dense"
        onChange={ onRatingChange } />
      <RatingField trait="damage_lethal" value={ character.damage_lethal }
        label="Lethal" margin="dense"
        onChange={ onRatingChange } />
      <RatingField trait="damage_aggravated" value={ character.damage_aggravated }
        label="Aggravated" margin="dense"
        onChange={ onRatingChange } />
    </div>

    <Typography variant="subheading" className={ classes.subheading }>
      Levels:
    </Typography>
    <div>
      <RatingField trait="health_level_0s" value={ character.health_level_0s }
        label="0" narrow margin="dense"
        onChange={ onRatingChange } />
      <RatingField trait="health_level_1s" value={ character.health_level_1s }
        label="-1" narrow margin="dense"
        onChange={ onRatingChange } />
      <RatingField trait="health_level_2s" value={ character.health_level_2s }
        label="-2" narrow margin="dense"
        onChange={ onRatingChange } />
      <RatingField trait="health_level_4s" value={ character.health_level_4s }
        label="-4" narrow margin="dense"
        onChange={ onRatingChange } />
      <RatingField trait="health_level_incap" value={ character.health_level_incap }
        label="Incap" narrow margin="dense"
        onChange={ onRatingChange } />
    </div>
  </BlockPaper>

}
HealthLevelEditor.propTypes = {
  character: PropTypes.object.isRequired,
  penalties: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onRatingChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}


export default withStyles(styles)(HealthLevelEditor)
