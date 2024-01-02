import { Character, Charm } from '@/types'
import { Ability } from '@/utils/constants.new/abilities'
import { Attribute } from '@/utils/constants.new/attributes'
import CustomExcellency from './custom'
import DbExcellency, { dbExcellencyAbils } from './dragonblooded'
import LunarExcellency, { lunarExcellencyAbils } from './lunar'
import SiderealExcellency, { siderealExcellencyAbils } from './sidereal'
import SolarExcellency, { solarExcellencyAbils } from './solar'

export const excellencyAbils = (character: Character, charms: Array<Charm>) => {
  // Mortals do not have excellencies
  if (character.type === 'Character') return []

  let excellencies = character.excellencies_for || []

  if (character.type === 'SolarCharacter' || excellencies.includes('solar')) {
    excellencies = excellencies.concat(solarExcellencyAbils(character, charms))
  }
  if (
    character.type === 'DragonbloodCharacter' ||
    excellencies.includes('dragonblood')
  ) {
    excellencies = excellencies.concat(dbExcellencyAbils(character, charms))
  }
  if (character.type === 'LunarCharacter' || excellencies.includes('lunar')) {
    excellencies = excellencies.concat(lunarExcellencyAbils(character, charms))
  }
  if (
    character.type === 'SiderealCharacter' ||
    excellencies.includes('sidereal')
  ) {
    excellencies = excellencies.concat(
      siderealExcellencyAbils(character, charms),
    )
  }

  // Because ES6 lacks a .uniq method:
  return [...new Set(excellencies)]
}

export function maxExcellency(
  character: Character,
  attribute: Attribute,
  ability: Ability,
  excellencyAbils: Array<string>,
  staticRating = false,
  stunt = false,
) {
  let abili = ability
  if (abili.startsWith('craft')) abili = 'craft'
  if (abili.startsWith('martial arts')) abili = 'martial_arts'

  if (
    character.type === 'Character' ||
    (stunt && [undefined, ''].includes(character.excellency_stunt)) ||
    !(
      excellencyAbils.includes(attribute) ||
      excellencyAbils.includes(abili) ||
      excellencyAbils.includes('*')
    )
  )
    return 0

  switch (character.type) {
    case 'SolarCharacter':
      return SolarExcellency(character, attribute, ability, staticRating)
    case 'DragonbloodCharacter':
      return DbExcellency(character, attribute, ability, staticRating)
    case 'LunarCharacter':
      return LunarExcellency(character, attribute, ability, staticRating, stunt)
    case 'SiderealCharacter':
      return SiderealExcellency(character, attribute, ability)
  }

  return CustomExcellency(character, attribute, ability, staticRating, stunt)
}
