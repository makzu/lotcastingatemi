import { Character } from '@/types'
import { solarExcellencyAbils } from './solar'

/* Sidereal Excellencies */

// Caste and Favored Abilities with at least one dot, plus Abilities with at least one Charm
export const siderealExcellencyAbils = solarExcellencyAbils

// Higher of Essence or 3. Sids do not halve static ratings
const siderealExcellency = (
  character: Character,
  attribute: string,
  ability: string,
  _staticRating = false,
) => Math.max(character.essence, 3)
export default siderealExcellency
