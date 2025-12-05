import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { prettyCanonType } from 'utils/calculated/pretty'

interface Props {
  value: string
  onChange: React.ChangeEventHandler
}
const ExaltTypeSelect = (props: Props) => {
  const { value, onChange } = props

  const MenuItemMapping = (t: string) => (
    <MenuItem key={t} value={t}>
      {prettyCanonType(t)}
    </MenuItem>
  )

  const canonChoices = [
    'Character',
    'SolarCharacter',
    'DragonbloodCharacter',
    'LunarCharacter',
    'SiderealCharacter',
    'AbyssalCharacter',
    'AlchemicalCharacter',
    'InfernalCharacter',
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
