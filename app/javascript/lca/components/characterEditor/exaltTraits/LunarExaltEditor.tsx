import * as React from 'react'

import { MenuItem } from '@mui/material'

import LunarCasteSelect from './LunarCasteSelect'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/shared/BlockPaper'

import { Character } from 'types'
import { nonCasteAttributes } from 'utils/calculated'
import { LUNAR_CASTE_ATTRIBUTES } from 'utils/constants.js'

interface Props {
  character: Character
  onChange(): React.ChangeEventHandler
}

const LunarExaltEditor = ({ character, onChange }: Props) => {
  const casteAttributeOptions = LUNAR_CASTE_ATTRIBUTES[character.caste] || []

  let noOptionItem: React.ReactNode
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
