import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
    width: '5.5em',
  },
  abilityRating: {
    float: 'right',
    display: 'inline-block',
  },
})

function WeaponAttributeSelect(props) {
  const { character, weapon, onChange, classes } = props

  return <TextField select name="attr"
    className={ classes.root }
    label="Attribute"
    value={ weapon.attr }
    onChange={ onChange }
  >
    <MenuItem value="dexterity">
      Dex&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_dexterity })
      </span>
    </MenuItem>
    <Divider />

    <MenuItem value="intelligence">
      Int&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_intelligence })
      </span>
    </MenuItem>

    <MenuItem value="strength">
      Str&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_strength })
      </span>
    </MenuItem>
    <MenuItem value="stamina">
      Sta&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_stamina })
      </span>
    </MenuItem>
    <MenuItem value="charisma">
      Cha&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_charisma })
      </span>
    </MenuItem>
    <MenuItem value="manipulation">
      Man&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_manipulation })
      </span>
    </MenuItem>
    <MenuItem value="appearance">
      App&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_appearance })
      </span>
    </MenuItem>
    <MenuItem value="perception">
      Per&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_perception })
      </span>
    </MenuItem>
    <MenuItem value="wits">
      Wits&nbsp;
      <span className={ classes.abilityRating }>
        ({ character.attr_wits })
      </span>
    </MenuItem>
  </TextField>
}
WeaponAttributeSelect.propTypes = {
  character: PropTypes.object.isRequired,
  weapon: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(WeaponAttributeSelect)
