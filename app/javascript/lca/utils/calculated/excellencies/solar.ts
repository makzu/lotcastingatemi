import type { Character, Charm } from '@/types'
import type { Ability } from '@/utils/constants.new/abilities'
import type { Attribute } from '@/utils/constants.new/attributes'
import { abil, attr } from '..'

/* Solar Excellencies: Core p.255 */

// Caste and Favored Abilities with at least one dot, plus Abilities with at least one Charm
export const solarExcellencyAbils = (character: Character, charms: Charm[]) => {
  const excellencies: Ability[] = []

  character.caste_abilities.forEach((a) => {
    if (abil(character, a) >= 1) excellencies.push(a)
  })
  character.favored_abilities.forEach((a) => {
    if (abil(character, a) >= 1) excellencies.push(a)
  })
  charms.forEach((c) => {
    if (c.ability) excellencies.push(c.ability as Ability)
    else if (c.charm_type === 'MartialArts') excellencies.push('martial_arts')
  })

  return [...new Set(excellencies)]
}

// Attribute + Ability, round down for static ratings
const solarExcellency = (
  character: Character,
  attribute: Attribute,
  ability: Ability,
  staticRating = false,
) =>
  Math.floor(
    (attr(character, attribute) + abil(character, ability)) /
      (staticRating ? 2 : 1),
  )

export default solarExcellency
