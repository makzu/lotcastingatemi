import { ListSubheader, MenuItem, TextField } from '@mui/material/'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { TextFieldProps } from '@mui/material/TextField'

import { Character, Weapon } from 'types'
import * as calc from 'utils/calculated'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 2,
    marginRight: theme.spacing(),
    textTransform: 'capitalize',
  },
}))

interface Props extends Pick<TextFieldProps, 'onChange'> {
  character: Character
  weapon: Weapon
}

function WeaponAbilitySelect(props: Props) {
  const classes = useStyles({})
  const { character, weapon, onChange } = props

  const options = calc.attackAbilities(character).map((abil) => (
    <MenuItem
      key={abil.abil}
      value={abil.abil}
      style={{ textTransform: 'capitalize' }}
    >
      {abil.abil} ({abil.rating})
    </MenuItem>
  ))
  const nonAttackOptions = calc.nonAttackAbilities(character).map((abil) => (
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
      className={classes.root}
      name="ability"
      label="Attack Ability"
      margin="dense"
      onChange={onChange}
    >
      <ListSubheader>Current Ability</ListSubheader>
      <MenuItem value={weapon.ability} style={{ textTransform: 'capitalize' }}>
        {weapon.ability} ({calc.abil(character, weapon.ability)})
      </MenuItem>

      <ListSubheader>Combat Abilities</ListSubheader>
      {options}
      {character.abil_martial_arts.length === 0 && (
        <ListSubheader>No Martial Arts ratings</ListSubheader>
      )}

      <ListSubheader>Other Abilities</ListSubheader>
      {nonAttackOptions}
    </TextField>
  )
}
export default WeaponAbilitySelect
