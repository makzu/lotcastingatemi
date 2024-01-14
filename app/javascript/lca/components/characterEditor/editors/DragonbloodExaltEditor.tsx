import Typography from '@mui/material/Typography'

import DbAspectSelect from '../exaltTraits/DbAspectSelect'
import AbilitySelect from 'components/generic/abilitySelect'
import BlockPaper from 'components/shared/BlockPaper'

import { nonCasteAbilities } from 'utils/calculated'
import type { Character } from '@/types'
interface Props {
  character: Character
  onChange: $TSFixMeFunction
}

function DragonbloodExaltEditor({ character, onChange }: Props) {
  let caste_abilities = character.caste_abilities || []

  if (character.caste === 'water') {
    caste_abilities = [...caste_abilities, 'martial arts'].sort()
  }

  return (
    <BlockPaper>
      <DbAspectSelect value={character.caste} onChange={onChange} />

      <Typography
        style={{
          marginTop: '0.5em',
          textTransform: 'capitalize',
        }}
      >
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
