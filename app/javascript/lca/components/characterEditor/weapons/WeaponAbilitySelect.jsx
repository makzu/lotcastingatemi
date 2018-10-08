// @flow
import * as React from 'react'

import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import * as calc from 'utils/calculated'
import type { fullWeapon } from 'utils/flow-types'

const styles = theme => ({
  abilitySelect: {
    marginRight: theme.spacing.unit,
    flex: 2,
    textTransform: 'capitalize',
  },
})

type Props = {
  character: Object,
  weapon: fullWeapon,
  classes: Object,
  onChange: Function,
}

function WeaponAbilitySelect(props: Props) {
  const { character, weapon, onChange, classes } = props

  const options = calc.attackAbilities(character).map(abil => (
    <MenuItem
      key={abil.abil}
      value={abil.abil}
      style={{ textTransform: 'capitalize' }}
    >
      {abil.abil} ({abil.rating})
    </MenuItem>
  ))
  const nonAttackOptions = calc.nonAttackAbilities(character).map(abil => (
    <MenuItem
      key={abil.abil}
      value={abil.abil}
      style={{ textTransform: 'capitalize' }}
    >
      {abil.abil} ({abil.rating})
    </MenuItem>
  ))

  return (
    <TextField
      select
      value={weapon.ability}
      className={classes.abilitySelect}
      name="ability"
      label="Attack Ability"
      margin="dense"
      onChange={onChange}
    >
      <ListSubheader value="header">Current Ability</ListSubheader>
      <MenuItem value={weapon.ability} style={{ textTransform: 'capitalize' }}>
        {weapon.ability} ({calc.abil(character, weapon.ability)})
      </MenuItem>

      <ListSubheader value="header" disabled>
        Combat Abilities
      </ListSubheader>
      {options}
      {character.abil_martial_arts.length === 0 && (
        <ListSubheader value="header">No Martial Arts ratings</ListSubheader>
      )}

      <ListSubheader value="header">Other Abilities</ListSubheader>
      {nonAttackOptions}
    </TextField>
  )
}
export default withStyles(styles)(WeaponAbilitySelect)
