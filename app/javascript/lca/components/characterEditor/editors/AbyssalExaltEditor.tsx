import React from 'react'

import MenuItem from '@mui/material/MenuItem'

import AbyssalCasteSelect from 'components/characterEditor/exaltTraits/AbyssalCasteSelect'
import AbilitySelect from 'components/generic/abilitySelect'
import BlockPaper from 'components/generic/blockPaper'

import { nonCasteAbilities } from 'utils/calculated'
import { ABYSSAL_CASTE_ABILITIES } from 'utils/constants'
import { Character } from '@/types'

interface Props {
  character: Character
  onChange: React.ChangeEventHandler
}
function AbyssalExaltEditor({ character, onChange }: Props) {
  const casteAbilities = ABYSSAL_CASTE_ABILITIES[character.caste] || []
  let supernalAbilities = casteAbilities
  if (character.caste === 'dusk')
    supernalAbilities = [
      ...casteAbilities.slice(0, 4),
      { abil: 'abil_martial_arts', pretty: 'Martial Arts' },
      ...casteAbilities.slice(4),
    ]

  const noOptionItem =
    character.caste == undefined ? (
      <MenuItem disabled>Select a Caste</MenuItem>
    ) : undefined

  return (
    <BlockPaper>
      <AbyssalCasteSelect value={character.caste} onChange={onChange} />
      &nbsp;&nbsp;
      <AbilitySelect
        name="supernal_ability"
        label="Apocalyptic Ability"
        value={character.supernal_ability || ''}
        abilities={supernalAbilities}
        prependOptions={noOptionItem}
        onChange={onChange}
        margin="dense"
      />
      <br />
      <AbilitySelect
        name="caste_abilities"
        label="Caste Abilities"
        value={character.caste_abilities || []}
        abilities={casteAbilities}
        onChange={onChange}
        prependOptions={noOptionItem}
        multiple
        fullWidth
        margin="dense"
      />
      <br />
      <AbilitySelect
        name="favored_abilities"
        label="Favored Abilities"
        value={character.favored_abilities}
        abilities={nonCasteAbilities(character)}
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}

export default AbyssalExaltEditor
