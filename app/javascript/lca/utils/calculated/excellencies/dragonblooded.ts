import { Character, Charm } from '@/types'
import { Ability } from '@/utils/constants.new/abilities'
import { abil, specialtiesFor } from '..'

/* Dragon-Blooded Excellencies: WFHW p.162 */

// All abilities that have an 'Excellency' keyworded Charm
export const dbExcellencyAbils = (character: Character, charms: Charm[]) => {
  let excellencies: Ability[] = []
  charms.forEach((c) => {
    if (c.keywords.includes('excellency'))
      excellencies.push(c.ability as Ability)
  })

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
