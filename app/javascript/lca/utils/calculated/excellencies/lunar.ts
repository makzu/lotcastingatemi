import { Ability, Attribute, Character, Charm } from 'types'
import { ATTRIBUTES } from 'utils/constants'
import { attr } from '..'
import { highestOtherAttribute } from './custom'

export const lunarExcellencyAbils = (character: Character, charms: Charm[]) => {
  const charmsPerAttribute: { [K in Attribute]?: number } = {}
  const casteAndFav: string[] = character.caste_attributes.concat(
    character.favored_attributes,
  )

  charms.forEach((ch) => {
    charmsPerAttribute[(ch.ability as Attribute) ?? ''] =
      (charmsPerAttribute[(ch.ability as Attribute) ?? ''] ?? 0) + 1
  })

  const attributes = ATTRIBUTES.map((a) => {
    const pretty = a.pretty.toLowerCase()

    if (
      character[a.attr] >= 5 ||
      // @ts-expect-error Gotta fix this once the new constants are in
      charmsPerAttribute[pretty] >= 2 ||
      (casteAndFav.includes(pretty) &&
        // @ts-expect-error Gotta fix this once the new constants are in
        (character[a.attr] >= 3 || charmsPerAttribute[pretty] >= 1))
    ) {
      return pretty
    }
  })

  // @ts-expect-error TODO fix me
  return [...new Set(attributes)] as Attribute
}

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
