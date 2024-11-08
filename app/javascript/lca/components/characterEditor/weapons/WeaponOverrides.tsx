import type { ChangeEvent } from 'react'

import { Box } from '@mui/material'

import WeaponAttributeSelect from './WeaponAttributeSelect'

const WeaponOverrides = (props) => {
  const { character, weapon, onChange } = props
  const { overrides } = weapon

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [a, b] = e.target.name.split('.')
    const { value } = e.target
    const newOverrides = { ...overrides, [a]: { ...overrides[a], [b]: value } }
    if (value == null || value === 'null') {
      delete newOverrides[a][b]
      if (Object.keys(newOverrides[a] === 0)) {
        delete newOverrides[a]
      }
    }
    props.onChange({ target: { name: 'overrides', value: newOverrides } })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <WeaponAttributeSelect
        type="attack"
        label="Attack Attribute"
        name="attack_attribute.use"
        value={overrides.attack_attribute?.use}
        character={character}
        weapon={weapon}
        onChange={handleChange}
      />
      {/* <Checkbox name="attack_attribute.base_only" /> */}
      <WeaponAttributeSelect
        type="defense"
        label="Defense Attribute"
        name="defense_attribute.use"
        value={overrides.defense_attribute?.use}
        character={character}
        weapon={weapon}
        onChange={handleChange}
      />
      <WeaponAttributeSelect
        type="damage"
        label="Damage Attribute"
        name="damage_attribute.use"
        value={overrides.damage_attribute?.use}
        character={character}
        weapon={weapon}
        onChange={handleChange}
      />
    </Box>
  )
}

export default WeaponOverrides
