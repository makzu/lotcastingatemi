// @flow
import * as React from 'react'
const { PureComponent } = React

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

export const prettyType = (type: string) => {
  switch (type) {
    case 'Character':
      return 'Mortal'
    case 'SolarCharacter':
      return 'Solar Exalt'
    case 'DragonbloodCharacter':
      return 'Dragon-Blooded Exalt'
    case 'LunarCharacter':
      return 'Lunar Exalt'

    case 'CustomAbilityCharacter':
      return 'Ability-Based Exalt'
    case 'CustomAttributeCharacter':
      return 'Attribute-Based Exalt'
    case 'CustomEssenceCharacter':
      return 'Essence-Based Exalt / Spirit'
  }
}

type Props = { value: string, onChange: Function }
class ExaltTypeSelect extends PureComponent<Props> {
  render() {
    const { value, onChange } = this.props

    const MenuItemMapping = t => (
      <MenuItem key={t} value={t}>
        {prettyType(t)}
      </MenuItem>
    )

    const canonChoices = [
      'Character',
      'SolarCharacter',
      'DragonbloodCharacter',
      'LunarCharacter',
    ].map(MenuItemMapping)

    const customChoices = [
      'CustomAbilityCharacter',
      'CustomAttributeCharacter',
      'CustomEssenceCharacter',
    ].map(MenuItemMapping)

    return (
      <TextField
        select
        name="type"
        value={value}
        label={value === 'Character' ? 'Character Type' : 'Exalt Type'}
        onChange={onChange}
        fullWidth
        margin="normal"
        data-cy="select-exalt-type"
      >
        <ListSubheader disabled value="">
          Canon/Published Exalts
        </ListSubheader>
        {canonChoices}

        <ListSubheader disabled value="">
          Custom / Houserule / Exigent Exalts
        </ListSubheader>
        {customChoices}
      </TextField>
    )
  }
}

export default ExaltTypeSelect
