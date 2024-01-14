import type { ChangeEventHandler, ReactNode } from 'react'

import { MenuItem } from '@mui/material'

import AbilitySelect from '@/components/generic/abilitySelect'
import BlockPaper from '@/components/shared/BlockPaper'
import type { Character } from '@/types'
import { nonCasteAttributes } from '@/utils/calculated'
import { LUNAR_CASTE_ATTRIBUTES } from '@/utils/constants'
import LunarCasteSelect from './LunarCasteSelect'

interface Props {
  character: Character
  onChange(): ChangeEventHandler
}

const LunarExaltEditor = ({ character, onChange }: Props) => {
  const casteAttributeOptions = LUNAR_CASTE_ATTRIBUTES[character.caste] || []

  let noOptionItem: ReactNode
  if (character.caste === '' || character.caste == null) {
    noOptionItem = <MenuItem disabled>Select a Caste</MenuItem>
  } else if (character.caste === 'casteless') {
    noOptionItem = (
      <MenuItem disabled>Casteless Lunars have no Caste Attributes</MenuItem>
    )
  }

  return (
    <BlockPaper>
      <LunarCasteSelect value={character.caste} onChange={onChange} />

      <AbilitySelect
        attributesOnly
        name="caste_attributes"
        label="Caste Attributes"
        value={character.caste_attributes}
        attributes={casteAttributeOptions}
        onChange={onChange}
        prependOptions={noOptionItem}
        multiple
        fullWidth
        margin="dense"
      />
      <br />

      <AbilitySelect
        attributesOnly
        name="favored_attributes"
        label="Favored Attributes"
        value={character.favored_attributes}
        attributes={nonCasteAttributes(character)}
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}

export default LunarExaltEditor
