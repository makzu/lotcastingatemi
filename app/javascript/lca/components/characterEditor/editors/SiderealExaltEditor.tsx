import type React from 'react'
import Typography from '@material-ui/core/Typography'

import AbilitySelect from '@lca/components/generic/AbilitySelect.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import type { Character } from '@lca/types/index.ts'
import { nonCasteAbilities } from '@lca/utils/calculated/index.ts'
import SiderealCasteSelect from '../exaltTraits/SiderealCasteSelect.tsx'

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
