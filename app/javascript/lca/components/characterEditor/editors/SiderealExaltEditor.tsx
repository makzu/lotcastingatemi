import React from 'react'

import Typography from '@material-ui/core/Typography'

import SiderealCasteSelect from '../exaltTraits/SiderealCasteSelect'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'

import { nonCasteAbilities } from 'utils/calculated'
import { Character } from 'types'

type Props = { character: Character; onChange: React.ChangeEventHandler }
function SiderealExaltEditor({ character, onChange }: Props) {
  const caste_abilities = character.caste_abilities || []

  return (
    <BlockPaper>
      <SiderealCasteSelect value={character.caste} onChange={onChange} />
      
      <Typography style={{ marginTop: '0.5em', textTransform: 'capitalize' }}>
        Caste Abilities: {caste_abilities.join(', ').replace('_', ' ')}
      </Typography>

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
export default SiderealExaltEditor
