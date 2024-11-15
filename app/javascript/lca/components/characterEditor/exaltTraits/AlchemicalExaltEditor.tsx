import * as React from 'react'

import { MenuItem, Typography } from '@material-ui/core'

import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import AlchemicalCasteSelect from './AlchemicalCasteSelect'

import { Character } from 'types'
import { nonCasteAttributes } from 'utils/calculated'

interface Props {
  character: Character
  onChange(): React.ChangeEventHandler
}

const AlchemicalExaltEditor = ({ character, onChange }: Props) => {


  let noOptionItem: React.ReactNode
  if (character.caste === '' || character.caste == null) {
    noOptionItem = <MenuItem disabled>Select a Caste</MenuItem>
  }

  return (
    <BlockPaper>
      <AlchemicalCasteSelect value={character.caste} onChange={onChange} />

      <Typography style={{ marginTop: '0.5em', textTransform: 'capitalize' }}>
        Caste Attributes: {character.caste_attributes.join(', ')}
      </Typography>
      <br />

      <AbilitySelect
        attributesOnly
        name="favored_attributes"
        label="Favored Attributes"
        value={character.favored_attributes}
        attributes={nonCasteAttributes(character)}
        onChange={onChange}
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}

export default AlchemicalExaltEditor
