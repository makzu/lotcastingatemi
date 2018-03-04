import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/ratingField.jsx'

const styles = theme => ({
  separator: { ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
  subheading: {
    marginTop: theme.spacing.unit,
  },
})

function XpEditor(props) {
  const { character, onRatingChange, classes } = props

  return <BlockPaper>
    <Typography variant="title">XP:</Typography>

    <div>
      <RatingField trait="xp_spent" value={ character.xp_spent }
        label="Spent" max={ character.xp_total } margin="dense"
        onChange={ onRatingChange }
      />
      <span className={ classes.separator }>
        /
      </span>
      <RatingField trait="xp_total" value={ character.xp_total }
        label="Total" margin="dense"
        onChange={ onRatingChange }
      />
    </div>

    <Typography variant="subheading" className={ classes.subheading }>
      Solar XP:
    </Typography>
    <div>
      <RatingField trait="xp_solar_spent" value={ character.xp_solar_spent }
        label="Spent" max={ character.xp_solar_total } margin="dense"
        onChange={ onRatingChange }
      />
      <span className={ classes.separator }>
        /
      </span>
      <RatingField trait="xp_solar_total" value={ character.xp_solar_total }
        label="Total" margin="dense"
        onChange={ onRatingChange }
      />
    </div>

    <Typography variant="subheading" className={ classes.subheading }>
      Craft XP:
    </Typography>
    <div>
      <RatingField trait="xp_craft_silver" value={ character.xp_craft_silver }
        label="Silver" margin="dense" narrow
        onChange={ onRatingChange }
      />
      <span className={ classes.separator }>
        /
      </span>
      <RatingField trait="xp_craft_gold" value={ character.xp_craft_gold }
        label="Gold" margin="dense" narrow
        onChange={ onRatingChange }
      />
      <span className={ classes.separator }>
        /
      </span>
      <RatingField trait="xp_craft_white" value={ character.xp_craft_white }
        label="White" margin="dense" narrow
        onChange={ onRatingChange }
      />
    </div>
  </BlockPaper>
}
XpEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onRatingChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(XpEditor)
