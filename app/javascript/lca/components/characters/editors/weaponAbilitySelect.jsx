import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { ListSubheader } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import * as calc from '../../../utils/calculated'
import { fullWeapon } from '../../../utils/propTypes'

const styles = theme => ({
  abilitySelect: {
    marginRight: theme.spacing.unit,
    width: '8em',
    textTransform: 'capitalize',
  },
})

function WeaponAbilitySelect(props) {
  const { character, weapon, onChange, classes } = props

  const options = calc.attackAbilities(character).map((abil) =>
    <MenuItem key={ abil.abil } value={ abil.abil }>
      { abil.abil } ({ abil.rating })
    </MenuItem>
  )
  const nonAttackOptions = calc.nonAttackAbilities(character).map((abil) =>
    <MenuItem key={ abil.abil } value={ abil.abil }>
      { abil.abil } ({ abil.rating })
    </MenuItem>
  )

  return <TextField select value={ weapon.ability } className={ classes.abilitySelect }
    name="ability" label="Ability" margin="dense" style={{ overflow: 'hidden', }}
    onChange={ onChange }
  >
    <ListSubheader value="header">Combat Abilities</ListSubheader>
    { options }

    <ListSubheader value="header">Other Abilities</ListSubheader>
    { nonAttackOptions }
  </TextField>
}
WeaponAbilitySelect.propTypes = {
  character: PropTypes.object.isRequired,
  weapon: PropTypes.shape(fullWeapon).isRequired,
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}
export default withStyles(styles)(WeaponAbilitySelect)
