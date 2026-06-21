import Typography from '@material-ui/core/Typography'

import AbilitySelect from '@lca/components/generic/AbilitySelect.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import type { Character } from '@lca/types/character.ts'
import { nonCasteAbilities } from '@lca/utils/calculated/index.ts'
import DbAspectSelect from '../exaltTraits/DbAspectSelect.tsx'

type Props = { character: Character; onChange: Function }
function DragonbloodExaltEditor({ character, onChange }: Props) {
  let caste_abilities = character.caste_abilities || []
  if (character.caste === 'water') {
    caste_abilities = [...caste_abilities, 'martial arts'].sort()
  }

  return (
    <BlockPaper>
      <DbAspectSelect value={character.caste} onChange={onChange} />

      <Typography style={{ marginTop: '0.5em', textTransform: 'capitalize' }}>
        Aspect Abilities: {caste_abilities.join(', ')}
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
export default DragonbloodExaltEditor
