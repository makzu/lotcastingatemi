import * as React from 'react'

import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

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
    case 'SiderealCharacter':
      return 'Sidereal Exalt'

    case 'CustomAbilityCharacter':
      return 'Ability-Based Exalt'
    case 'CustomAttributeCharacter':
      return 'Attribute-Based Exalt'
    case 'CustomEssenceCharacter':
      return 'Essence-Based Exalt / Spirit'
  }
}

interface Props {
  value: string
  onChange: React.ChangeEventHandler
}
const ExaltTypeSelect = (props: Props) => {
  const { value, onChange } = props

  const MenuItemMapping = (t: string) => (
    <MenuItem key={t} value={t}>
      {prettyType(t)}
    </MenuItem>
  )

  const canonChoices = [
    'Character',
    'SolarCharacter',
    'DragonbloodCharacter',
    'LunarCharacter',
    'SiderealCharacter',
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
      <ListSubheader>Canon/Published Exalts</ListSubheader>
      {canonChoices}

      <ListSubheader>Custom / Houserule / Exigent Exalts</ListSubheader>
      {customChoices}
    </TextField>
  )
}

export default ExaltTypeSelect
