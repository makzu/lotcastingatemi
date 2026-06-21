import type React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import InfernalCasteSelect from '@lca/components/characterEditor/exaltTraits/InfernalCasteSelect.tsx'
import AbilitySelect from '@lca/components/generic/AbilitySelect.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import type { Character } from '@lca/types/index.ts'
import { nonCasteAbilities } from '@lca/utils/calculated/index.ts'
import { INFERNAL_CASTE_ABILITIES } from '@lca/utils/constants.ts'

type Props = { character: Character; onChange: React.ChangeEventHandler }
function InfernalExaltEditor({ character, onChange }: Props) {
  const casteAbilities = INFERNAL_CASTE_ABILITIES[character.caste] || []
  let supernalAbilities = casteAbilities
  if (character.caste === 'azimuth')
    supernalAbilities = [
      ...casteAbilities.slice(0, 4),
      { abil: 'abil_martial_arts', pretty: 'Martial Arts' },
      ...casteAbilities.slice(4),
    ]

  const noOptionItem =
    character.caste === undefined ? (
      <MenuItem disabled>Select a Caste</MenuItem>
    ) : undefined

  return (
    <BlockPaper>
      <InfernalCasteSelect value={character.caste} onChange={onChange} />
      &nbsp;&nbsp;
      <AbilitySelect
        name="supernal_ability"
        label="Primordial Ability"
        value={character.supernal_ability || ''}
        abilities={supernalAbilities}
        prependOptions={noOptionItem}
        onChange={onChange}
        margin="dense"
      />
      <br />
      <AbilitySelect
        name="caste_abilities"
        label="Caste Abilities"
        value={character.caste_abilities || []}
        abilities={casteAbilities}
        onChange={onChange}
        prependOptions={noOptionItem}
        multiple
        fullWidth
        margin="dense"
      />
      <br />
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

export default InfernalExaltEditor
