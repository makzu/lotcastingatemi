import { Ability, Attribute, Character, Charm } from 'types'
import { ATTRIBUTES } from 'utils/constants.js'
import { attr } from '..'
import { highestOtherAttribute } from './custom.js'

export const lunarExcellencyAbils = (character: Character, charms: Charm[]) => {
  const charmsPerAttribute = {}
  const casteAndFav: string[] = character.caste_attributes.concat(
    character.favored_attributes
  )
  charms.forEach(ch => {
    charmsPerAttribute[ch.ability] = (charmsPerAttribute[ch.ability] || 0) + 1
  })

  const attributes = ATTRIBUTES.map(a => {
    const pretty = a.pretty.toLowerCase()

    if (
      character[a.attr] >= 5 ||
      charmsPerAttribute[pretty] >= 2 ||
      (casteAndFav.includes(pretty) &&
        (character[a.attr] >= 3 || charmsPerAttribute[pretty] >= 1))
    ) {
      return pretty
    }
  })

  return [...new Set(attributes)]
}

const LunarExcellency = (
  character: Character,
  attribute: Attribute,
  ability: Ability,
  staticRating: boolean,
  stunt: boolean = false
) =>
  Math.floor(
    (attr(character, attribute) +
      (stunt ? highestOtherAttribute(character, attribute) : 0)) /
      (staticRating ? 2 : 1)
  )

export default LunarExcellency
