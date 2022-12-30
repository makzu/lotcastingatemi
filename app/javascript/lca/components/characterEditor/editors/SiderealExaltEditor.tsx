import React from 'react'

import Typography from '@material-ui/core/Typography'

import DbAspectSelect from '../exaltTraits/DbAspectSelect'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'

import { nonCasteAbilities } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

type Props = { character: Character; onChange: React.ChangeEventHandler }
function SiderealExaltEditor({ character, onChange }: Props) {
  let caste_abilities = character.caste_abilities || []
  if (character.caste === 'water') {
    caste_abilities = [...caste_abilities, 'martial arts'].sort()
  }

  return (
    <BlockPaper>
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
