import { ICharacter, ICharm } from 'types'
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
    if (
      (casteAndFav.includes(a.pretty.toLowerCase()) &&
        character[a.attr] >= 3) ||
      character[a.attr] >= 4
    ) {
      return a.pretty.toLowerCase()
    }
  })

  Object.keys(charmsPerAttribute).forEach(k => {
    if (charmsPerAttribute[k] >= 2) {
      attributes.push(k)
    }
  })

  return [...new Set(attributes)]
}

const LunarExcellency = (
  character: ICharacter,
  attribute: string,
  ability: string,
  staticRating: boolean,
  stunt: boolean = false
) =>
  Math.floor(
    (attr(character, attribute) + stunt
      ? highestOtherAttribute(character, ability)
      : 0) / (staticRating ? 2 : 1)
  )

export default LunarExcellency
