import type {
  Ability,
  Attribute,
  Character,
  MartialArtsCharm,
  NativeCharm,
} from '@lca/types'
import { ATTRIBUTES } from '@lca/utils/constants'
import { attr } from '..'
import { highestOtherAttribute } from './custom.js'

export const lunarExcellencyAbils = (
  character: Character,
  charms: (NativeCharm | MartialArtsCharm)[],
) => {
  const charmsPerAttribute: Record<string, number> = {}
  const casteAndFav: string[] = character.caste_attributes.concat(
    character.favored_attributes,
  )
  charms.forEach((ch) => {
    charmsPerAttribute[ch.ability || ''] =
      (charmsPerAttribute[ch.ability || ''] || 0) + 1
  })

  const attributes = ATTRIBUTES.map((a) => {
    const pretty = a.pretty.toLowerCase()

    if (
      character[a.attr] >= 5 ||
      charmsPerAttribute[pretty] >= 2 ||
      (casteAndFav.includes(pretty) &&
        (character[a.attr] >= 3 || charmsPerAttribute[pretty] >= 1))
    ) {
      return pretty
    }
    return null
  })

  return [...new Set(attributes.filter((a) => a !== null))]
}

const LunarExcellency = (
  character: Character,
  attribute: Attribute,
  _ability: Ability,
  staticRating: boolean,
  stunt = false,
) =>
  Math.floor(
    (attr(character, attribute) +
      (stunt ? highestOtherAttribute(character, attribute) : 0)) /
      (staticRating ? 2 : 1),
  )

export default LunarExcellency
