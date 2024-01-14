import type { Character, Charm } from '@/types'
import type { Ability } from '@/utils/constants.new/abilities'
import { ATTRIBUTES ,type  Attribute  } from '@/utils/constants.new/attributes';
import { attr } from '..'
import { highestOtherAttribute } from './custom'

/* Fangs at the Gate, p. 142 */

// Caste and Favored Attrs at 3+ or with 1+ Charm, Other Attrs at 5 or with 2+ Charms
export const lunarExcellencyAbils = (character: Character, charms: Charm[]) => {
  const charmsPerAttribute = {} as Record<Attribute, number>
  const casteAndFav: Attribute[] = character.caste_attributes.concat(
    character.favored_attributes,
  )

  charms.forEach((ch) => {
    if (ch.ability != null)
      charmsPerAttribute[ch.ability] = (charmsPerAttribute[ch.ability] || 0) + 1
  })

  const attributes = ATTRIBUTES.filter(
    (a) =>
      attr(character, a) >= 5 ||
      (charmsPerAttribute[a] || 0) >= 2 ||
      (casteAndFav.includes(a) &&
        (character[`attr_${a}`] >= 3 || charmsPerAttribute[a] >= 1)),
  )

  // @ts-expect-error TODO fix me
  return [...new Set(attributes)] as Attribute
}

// Attribute, + highest other Attribute with a Stunt. Round down for static ratings
const LunarExcellency = (
  character: Character,
  attribute: Attribute,
  ability: Ability,
  staticRating: boolean,
  stunt = false,
) =>
  Math.floor(
    (attr(character, attribute) +
      (stunt ? highestOtherAttribute(character, attribute) : 0)) /
      (staticRating ? 2 : 1),
  )

export default LunarExcellency
