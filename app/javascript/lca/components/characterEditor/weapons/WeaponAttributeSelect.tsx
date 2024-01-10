import React, { MouseEvent } from 'react'

import {
  Divider,
  ListSubheader,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from '@material-ui/core'

import { TextFieldProps } from '@material-ui/core/TextField'
import { Character, Weapon } from 'types'
import { ATTRIBUTE_NAMES } from 'utils/constants'

const useStyles = makeStyles((theme: Theme) => ({
  capitalize: {
    textTransform: 'capitalize',
  },
  divider: {
    margin: '0.5em 0',
  },
  root: {
    flex: 1,
    marginRight: theme.spacing(),
    textTransform: 'capitalize',
  },
}))

interface Props
  extends Pick<TextFieldProps, 'onChange' | 'label' | 'name' | 'value'> {
  character: Character
  weapon: Weapon
  type: 'attack' | 'defense' | 'damage'
}

const ignoreClick = (e: MouseEvent) => {
  e.preventDefault()
}

const WeaponAttributeSelect = (props: Props) => {
  const classes = useStyles({})
  const { character, weapon, type, value, ...otherProps } = props
  const isDamage = type === 'damage'
  const defaultValue = isDamage ? 'strength' : 'dexterity'
  const fixedValue = value || 'null'

  const attributeItems = ATTRIBUTE_NAMES.map((attr) => (
    <MenuItem
      key={attr}
      value={attr === defaultValue ? null : attr}
      className={classes.capitalize}
    >
      {attr} ({character[`attr_${attr}`]})
    </MenuItem>
  ))

  return (
    <TextField
      select
      className={classes.root}
      value={fixedValue}
      margin="dense"
      {...otherProps}
    >
      {type === 'damage' && [
        <ListSubheader key="flame" onClick={ignoreClick}>
          Crossbow/Flame tagged weapons ignore this
        </ListSubheader>,
        <MenuItem value="null" key="strength">
          Strength ({character.attr_strength})
        </MenuItem>,
      ]}
      {type !== 'damage' && (
        <MenuItem value="null">Dexterity ({character.attr_dexterity})</MenuItem>
      )}

      <Divider className={classes.divider} onClick={ignoreClick} />

      {attributeItems}

      <Divider className={classes.divider} onClick={ignoreClick} />

      <MenuItem value="essence">Essence ({character.essence})</MenuItem>
    </TextField>
  )
}

export default WeaponAttributeSelect
