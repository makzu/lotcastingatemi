import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
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
      Dexterity ({ character.attr_dexterity })
    </MenuItem>
    <Divider />

    <MenuItem value="intelligence">
      Intelligence ({ character.attr_intelligence })
    </MenuItem>

    <MenuItem value="strength">
      Strength ({ character.attr_strength })
    </MenuItem>
    <MenuItem value="stamina">
      Stamina ({ character.attr_stamina })
    </MenuItem>
    <MenuItem value="charisma">
      Charisma ({ character.attr_charisma })
    </MenuItem>
    <MenuItem value="manipulation">
      Manipulation ({ character.attr_manipulation })
    </MenuItem>
    <MenuItem value="appearance">
      Appearance ({ character.attr_appearance })
    </MenuItem>
    <MenuItem value="perception">
      Perception ({ character.attr_perception })
    </MenuItem>
    <MenuItem value="wits">
      Wits ({ character.attr_wits })
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
