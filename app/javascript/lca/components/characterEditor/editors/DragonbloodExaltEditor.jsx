// @flow
import React from 'react'

import Typography from '@material-ui/core/Typography'

import DbAspectSelect from '../exaltTraits/DbAspectSelect.jsx'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'

import { nonCasteAbilities } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

function DragonbloodExaltEditor({
  character,
  onRatingChange,
}: {
  character: Character,
  onRatingChange: Function,
}) {
  let caste_abilities = character.caste_abilities || []
  if (character.caste === 'water') {
    caste_abilities = [...caste_abilities, 'martial arts'].sort()
  }

  return (
    <BlockPaper>
      <DbAspectSelect value={character.caste} onChange={onRatingChange} />

      <Typography style={{ marginTop: '0.5em', textTransform: 'capitalize' }}>
        Aspect Abilities: {caste_abilities.join(', ')}
      </Typography>

      <AbilitySelect
        name="favored_abilities"
        label="Favored Abilities"
        value={character.favored_abilities}
        abilities={nonCasteAbilities(character)}
        onChange={onRatingChange}
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}
export default DragonbloodExaltEditor
