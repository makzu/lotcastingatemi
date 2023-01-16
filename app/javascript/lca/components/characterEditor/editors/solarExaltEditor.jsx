// @flow
import MenuItem from '@mui/material/MenuItem'

import SolarCasteSelect from 'components/characterEditor/exaltTraits/SolarCasteSelect'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/shared/BlockPaper'

import { nonCasteAbilities } from 'utils/calculated'
import { SOLAR_CASTE_ABILITIES } from 'utils/constants.js'
import type { Character } from 'utils/flow-types'

type Props = { character: Character, onChange: Function }
function SolarExaltEditor({ character, onChange }: Props) {
  let casteAbilities = SOLAR_CASTE_ABILITIES[character.caste] || []
  let supernalAbilities = casteAbilities
  if (character.caste === 'dawn')
    supernalAbilities = [
      ...casteAbilities.slice(0, 4),
      { abil: 'abil_martial_arts', pretty: 'Martial Arts' },
      ...casteAbilities.slice(4),
    ]

  const noOptionItem =
    character.caste == undefined ? (
      <MenuItem disabled>Select a Caste</MenuItem>
    ) : undefined

  return (
    <BlockPaper>
      <SolarCasteSelect value={character.caste} onChange={onChange} />
      &nbsp;&nbsp;
      <AbilitySelect
        name="supernal_ability"
        label="Supernal Ability"
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

export default SolarExaltEditor
