import { Typography } from '@mui/material'

import { nonCasteAbilities } from '@/utils/calculated'
import AbilitySelect from '@/components/generic/abilitySelect'
import BlockPaper from '@/components/shared/BlockPaper'
import type { Character } from '@/types'
import SiderealCasteSelect from '../exaltTraits/SiderealCasteSelect'

interface Props {
  character: Character
  onChange: React.ChangeEventHandler
}
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
