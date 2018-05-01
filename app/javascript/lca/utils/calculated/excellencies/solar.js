// @flow
import { attr, abil } from '..'
import type { Character, Charm } from 'utils/flow-types'

/* Solar Excellencies: Core p.255 */

// FEATURE: set excellency to 'solar' to get free excellencies the way Solars do, and calculate dice caps like Solars too
export const hasSolarExcellency = (character: Character) =>
  character.type === 'SolarCharacter' || character.excellency === 'solar'

// Caste and Favored Abilities with at least one dot, plus Abilities with at least one Charm
export const solarExcellencyAbils = (
  character: Character,
  charms: Array<Charm>
): Array<string> => {
  let excellencies = (character.caste_abilities || [])
    .filter(a => abil(character, a) > 0)
    .concat(
      (character.favored_abilities || []).filter(a => abil(character, a) > 0)
    )

  if (excellencies.includes('brawl') && character.abil_martial_arts.length > 0)
    excellencies = excellencies.concat(['martial_arts'])

  excellencies = excellencies.concat(
    charms.map(
      c => (c.charm_type === 'MartialArts' ? 'martial_arts' : c.ability)
    )
  )

  return excellencies
}

// Attribute + Ability, round down for static ratings
export default (
  character: Character,
  attribute: string,
  ability: string,
  staticRating: boolean = false
) =>
  Math.floor(
    (attr(character, attribute) + abil(character, ability)) /
      (staticRating ? 2 : 1)
  )
