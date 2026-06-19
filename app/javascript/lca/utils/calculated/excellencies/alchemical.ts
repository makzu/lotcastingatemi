import type {
  Ability,
  Attribute,
  Character,
  MartialArtsCharm,
  NativeCharm,
} from '@lca/types'
import { ATTRIBUTES } from '@lca/utils/constants'
import { attr } from '..'

export const alchemicalExcellencyAbils = (
  character: Character,
  charms: (NativeCharm | MartialArtsCharm)[],
) => {
  const charmsPerAttribute: Record<string, number> = {}
  const casteAndFav: string[] = character.caste_attributes.concat(
    character.favored_attributes,
  )
  charms.forEach((ch) => {
    if (
      ch.charm_type === 'Attribute' &&
      ch.loadouts?.includes(character.active_loadout)
    ) {
      charmsPerAttribute[ch.ability ?? ''] =
        (charmsPerAttribute[ch.ability ?? ''] ?? 0) + 1
    }
  })

  const attributes = ATTRIBUTES.map((a) => {
    const pretty = a.pretty.toLowerCase() as Attribute

    if (
      charmsPerAttribute[pretty] >= 1 ||
      (casteAndFav.includes(pretty) && character[a.attr] >= 3)
    ) {
      return pretty
    }
    return null
  })

  return [...new Set(attributes.filter((a) => a !== null))]
}

const AlchemicalExcellency = (
  character: Character,
  attribute: Attribute,
  _ability: Ability,
  staticRating: boolean,
  _stunt = false,
) =>
  Math.floor(
    (attr(character, attribute) + character.essence) / (staticRating ? 2 : 1),
  )

export default AlchemicalExcellency
