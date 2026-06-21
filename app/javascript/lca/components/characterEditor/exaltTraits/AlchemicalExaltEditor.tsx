import type * as React from 'react'
import { Typography } from '@material-ui/core'

import AbilitySelect from '@lca/components/generic/AbilitySelect.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import type { Character } from '@lca/types'
import { nonCasteAttributes } from '@lca/utils/calculated'
import AlchemicalCasteSelect from './AlchemicalCasteSelect'

interface Props {
  character: Character
  onChange(): React.ChangeEventHandler
}

const AlchemicalExaltEditor = ({ character, onChange }: Props) => {
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
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}

export default AlchemicalExaltEditor
