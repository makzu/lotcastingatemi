import { Ability, Attribute, ICharacter, ICharm } from 'types'
import { ATTRIBUTES } from 'utils/constants.js'
import { attr } from '..'
import { highestOtherAttribute } from './custom.js'

export const lunarExcellencyAbils = (
  character: ICharacter,
  charms: ICharm[]
) => {
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
      character[a.attr] >= 4 ||
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
  character: ICharacter,
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
