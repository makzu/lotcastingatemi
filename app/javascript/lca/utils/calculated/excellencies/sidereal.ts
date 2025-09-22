import { abil } from '..'
import type { Ability, Character, Charm } from 'types'
import { clamp } from 'utils/math'

/* Sidereal Excellencies */

// Caste and Favored Abilities with at least one dot, plus Abilities with at least one Charm
export const siderealExcellencyAbils = (
  character: Character,
  charms: Array<Charm>
): Array<string> => {
  let excellencies = (character.caste_abilities || [])
    .filter(a => abil(character, a) > 0)
    .concat(
      (character.favored_abilities || []).filter(a => abil(character, a) > 0)
    )

  excellencies = excellencies.concat(['martial_arts'])

  excellencies = excellencies.concat(
    charms.map(c =>
      c.charm_type === 'MartialArts' ? 'martial_arts' : c.ability as Ability
    )
  )

  return excellencies
}

// Higher of Essence or 3, max 5. Sids do not halve static ratings
const siderealExcellency = (
  character: Character,
  _attribute: string,
  _ability: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _staticRating: boolean = false
) =>
  clamp(character.essence, 3, 5)
export default siderealExcellency
