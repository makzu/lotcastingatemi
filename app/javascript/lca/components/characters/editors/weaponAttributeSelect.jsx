// @flow
import React, { Fragment } from 'react'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import { ListSubheader } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import type { fullWeapon } from 'utils/flow-types'

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
    minWidth: '10em',
  },
})

export type Props = {
  character: Object,
  weapon: fullWeapon,
  damage?: boolean,
  onChange: Function,
  classes: Object,
}

function WeaponAttributeSelect(props: Props) {
  const { character, weapon, damage, onChange, classes } = props

  return (
    <TextField
      select
      name={damage ? 'damage_attr' : 'attr'}
      className={classes.root}
      label={damage ? 'Damage Attribute' : 'Attack Attribute'}
      value={damage ? weapon.damage_attr : weapon.attr}
      onChange={onChange}
    >
      {damage && (
        <Fragment>
          <ListSubheader value="flame" disabled>
            Crossbow/Flame tagged weapons ignore this
          </ListSubheader>
          <MenuItem value="strength">
            Strength ({character.attr_strength})
          </MenuItem>
        </Fragment>
      )}
      {!damage && (
        <MenuItem value="dexterity">
          Dexterity ({character.attr_dexterity})
        </MenuItem>
      )}
      <Divider />

      <MenuItem value="intelligence">
        Intelligence ({character.attr_intelligence})
      </MenuItem>

      <MenuItem value="strength">Strength ({character.attr_strength})</MenuItem>
      <MenuItem value="dexterity">
        Dexterity ({character.attr_dexterity})
      </MenuItem>
      <MenuItem value="stamina">Stamina ({character.attr_stamina})</MenuItem>
      <MenuItem value="charisma">Charisma ({character.attr_charisma})</MenuItem>
      <MenuItem value="manipulation">
        Manipulation ({character.attr_manipulation})
      </MenuItem>
      <MenuItem value="appearance">
        Appearance ({character.attr_appearance})
      </MenuItem>
      <MenuItem value="perception">
        Perception ({character.attr_perception})
      </MenuItem>
      <MenuItem value="wits">Wits ({character.attr_wits})</MenuItem>
    </TextField>
  )
}

export default withStyles(styles)(WeaponAttributeSelect)
