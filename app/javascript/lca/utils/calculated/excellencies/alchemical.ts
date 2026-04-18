import { Ability, Attribute, Character, Charm } from 'types'
import { ATTRIBUTES } from 'utils/constants'
import { attr } from '..'

export const alchemicalExcellencyAbils = (
  character: Character,
  charms: Charm[],
) => {
  const charmsPerAttribute = {}
  const casteAndFav: string[] = character.caste_attributes.concat(
    character.favored_attributes,
  )
  charms.forEach((ch) => {
    if (ch.loadouts?.includes(character.active_loadout)) {
      charmsPerAttribute[ch.ability || ''] =
        (charmsPerAttribute[ch.ability || ''] || 0) + 1
    }
  })

  const attributes = ATTRIBUTES.map((a) => {
    const pretty = a.pretty.toLowerCase()

    if (
      charmsPerAttribute[pretty] >= 1 ||
      (casteAndFav.includes(pretty) && character[a.attr] >= 3)
    ) {
      return pretty
    }
  })

  return [...new Set(attributes)]
}

const AlchemicalExcellency = (
  character: Character,
  attribute: Attribute,
  ability: Ability,
  staticRating: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stunt = false,
) =>
  Math.floor(
    (attr(character, attribute) + character.essence) / (staticRating ? 2 : 1),
  )

export default AlchemicalExcellency
