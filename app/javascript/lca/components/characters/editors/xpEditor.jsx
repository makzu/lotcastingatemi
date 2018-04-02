import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import ListAttributeEditor from '../../generic/ListAttributeEditor.jsx'
import RatingField from '../../generic/RatingField.jsx'

const styles = theme => ({
  separator: { ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
  subheading: {
    marginTop: theme.spacing.unit,
  },
  xpWrap: {
    display: 'flex',
  },
  xpCol: {
    flex: 1,
  },
})

const XpFields = (props) => {
  const { onChange, onBlur, onRatingChange, classes } = props
  const { label, points } = props.trait

  return <Fragment>
    <TextField name="label" value={ label } className={ classes.nameField }
      label="For" margin="dense"
      onChange={ onChange } onBlur={ onBlur }
    />&nbsp;&nbsp;

    <RatingField trait="points" value={ points }
      label="Points" min={ 0 } margin="dense" narrow
      onChange={ onRatingChange }
    />
  </Fragment>
}
XpFields.propTypes = {
  trait: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onRatingChange: PropTypes.func,
  classes: PropTypes.object,
}

function XpEditor(props) {
  const { character, onRatingChange, classes } = props

  return <BlockPaper>
    <Typography variant="title">XP:</Typography>

    <div className={ classes.xpWrap }>
      <div className={ classes.xpCol }>
        <ListAttributeEditor label="XP Log"
          character={ character } trait="xp_log"
          Fields={ XpFields }
          newObject={{ label: '', points: 0 }}
          onChange={ onRatingChange }
        />

        <RatingField trait="xp_total" value={ character.xp_total }
          label="Earned" margin="dense"
          onChange={ onRatingChange } dontFocus
        />
      </div>

      <div className={ classes.xpCol }>
        <ListAttributeEditor label="Solar XP Log"
          character={ character } trait="xp_log_solar"
          Fields={ XpFields }
          newObject={{ label: '', points: 0 }}
          onChange={ onRatingChange }
        />

        <RatingField trait="xp_solar_total" value={ character.xp_solar_total }
          label="Earned" margin="dense"
          onChange={ onRatingChange } dontFocus
        />
      </div>
    </div>

    <div className={ classes.xpWrap }>
      <div className={ classes.xpCol }>
        <Typography variant="subheading" className={ classes.subheading }>
          Craft XP:
        </Typography>
        <div>
          <RatingField trait="xp_craft_silver" value={ character.xp_craft_silver }
            label="Silver" margin="dense" narrow
            onChange={ onRatingChange } dontFocus
          />
          <span className={ classes.separator }>
            /
          </span>
          <RatingField trait="xp_craft_gold" value={ character.xp_craft_gold }
            label="Gold" margin="dense" narrow
            onChange={ onRatingChange } dontFocus
          />
          <span className={ classes.separator }>
            /
          </span>
          <RatingField trait="xp_craft_white" value={ character.xp_craft_white }
            label="White" margin="dense" narrow
            onChange={ onRatingChange } dontFocus
          />
        </div>
      </div>

      <div className={ classes.xpCol }>
        <ListAttributeEditor label="BP Log"
          character={ character } trait="bp_log"
          Fields={ XpFields }
          newObject={{ label: '', points: 0 }}
          onChange={ onRatingChange }
        />
      </div>
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
