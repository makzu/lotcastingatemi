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
      Dex ({ character.attr_dexterity })
    </MenuItem>
    <Divider />

    <MenuItem value="intelligence">
      Int ({ character.attr_intelligence })
    </MenuItem>

    <MenuItem value="strength">
      Str ({ character.attr_strength })
    </MenuItem>
    <MenuItem value="stamina">
      Sta ({ character.attr_stamina })
    </MenuItem>
    <MenuItem value="charisma">
      Cha ({ character.attr_charisma })
    </MenuItem>
    <MenuItem value="manipulation">
      Man ({ character.attr_manipulation })
    </MenuItem>
    <MenuItem value="appearance">
      App ({ character.attr_appearance })
    </MenuItem>
    <MenuItem value="perception">
      Per ({ character.attr_perception })
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
