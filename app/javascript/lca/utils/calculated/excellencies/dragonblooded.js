// @flow
import { abil, specialtiesFor } from '..'
import type { Character, Charm } from 'utils/flow-types'

/* Dragon-Blooded Excellencies: WFHW Backer PDF p.162 */

// All abilities that have an 'Excellency' keyworded Charm
export const dbExcellencyAbils = (
  character: Character,
  charms: Array<Charm>,
): Array<string> => {
  let excellencies = charms
    .filter(
      (c) =>
        c.keywords.includes('excellency') || c.keywords.includes('Excellency'),
    )
    .map((c) => c.ability)

  if (excellencies.includes('brawl'))
    excellencies = excellencies.concat(['martial_arts'])

  return excellencies
}

// Ability + 1 with relevant specialty
// DBs apparently round down now: http://forum.theonyxpath.com/forum/main-category/exalted/1069023-ask-the-devs?p=1275486#post1275486
const dbExcellency = (
  character: Character,
  attribute: string,
  ability: string,
  staticRating = false,
) =>
  Math.floor(
    (abil(character, ability) +
      (specialtiesFor(character, ability).length > 0 ? 1 : 0)) /
      (staticRating ? 2 : 1),
  )
export default dbExcellency
