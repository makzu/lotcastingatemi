// @flow
import * as React from 'react'

import { withStyles } from 'material-ui/styles'
import { ListSubheader } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import * as calc from 'utils/calculated'
import type { fullWeapon } from 'utils/flow-types'

const styles = theme => ({
  abilitySelect: {
    marginRight: theme.spacing.unit,
    width: '8em',
    textTransform: 'capitalize',
  },
})

type Props = {
  character: Object,
  weapon: fullWeapon,
  extended?: boolean,
  classes: Object,
  onChange: Function,
}

function WeaponAbilitySelect(props: Props) {
  const { character, weapon, extended, onChange, classes } = props

  const options = calc.attackAbilities(character).map(abil => (
    <MenuItem
      key={abil.abil}
      value={abil.abil}
      style={{ textTransform: 'capitalize' }}
    >
      {abil.label} ({abil.rating})
    </MenuItem>
  ))
  const nonAttackOptions = calc.nonAttackAbilities(character).map(abil => (
    <MenuItem
      key={abil.abil}
      value={abil.abil}
      style={{ textTransform: 'capitalize' }}
    >
      {abil.label} ({abil.rating})
    </MenuItem>
  ))

  return (
    <TextField
      select
      value={weapon.ability}
      className={classes.abilitySelect}
      name="ability"
      label={extended ? 'Attack Ability (full list)' : 'Attack Ability'}
      margin="dense"
      style={extended ? { width: '15em' } : { width: '10em' }}
      onChange={onChange}
    >
      <ListSubheader value="header">Current Ability</ListSubheader>
      <MenuItem value={weapon.ability} style={{ textTransform: 'capitalize' }}>
        {weapon.ability} ({calc.abil(character, weapon.ability)})
      </MenuItem>

      <ListSubheader value="header">Combat Abilities</ListSubheader>
      {options}

      {extended && (
        <ListSubheader value="header">Other Abilities</ListSubheader>
      )}
      {extended && nonAttackOptions}
    </TextField>
  )
}
export default withStyles(styles)(WeaponAbilitySelect)
