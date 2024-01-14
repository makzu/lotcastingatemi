import Typography from '@mui/material/Typography'

import SiderealCasteSelect from '../exaltTraits/SiderealCasteSelect'
import AbilitySelect from 'components/generic/abilitySelect'
import BlockPaper from 'components/shared/BlockPaper'

import { nonCasteAbilities } from '@/utils/calculated'
import type { Character } from 'types'

interface Props {
  character: Character
  onChange: React.ChangeEventHandler
}
function SiderealExaltEditor({ character, onChange }: Props) {
  const caste_abilities = character.caste_abilities || []

  return (
    // @ts-expect-error I suspect the MUI v5 migration will fix this
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
