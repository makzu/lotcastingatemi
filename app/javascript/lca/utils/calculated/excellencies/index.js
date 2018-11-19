// @flow
import SolarExcellency, { solarExcellencyAbils } from './solar.js'
import DbExcellency, { dbExcellencyAbils } from './dragonblooded.js'
import CustomExcellency from './custom.js'
import type { Character, Charm } from 'utils/flow-types'

export const excellencyAbils = (
  character: Character,
  charms: Array<Charm>
): Array<string> => {
  // Mortals do not have excellencies
  if (character.type === 'Character') return []

  let excellencies: Array<string> = character.excellencies_for || []

  if (character.type === 'SolarCharacter' || excellencies.includes('solar')) {
    excellencies = excellencies.concat(solarExcellencyAbils(character, charms))
  }
  if (
    character.type === 'DragonbloodCharacter' ||
    excellencies.includes('dragonblood')
  ) {
    excellencies = excellencies.concat(dbExcellencyAbils(character, charms))
  }

  // Because ES6 lacks a .uniq method:
  return [...new Set(excellencies)]
}

export function maxExcellency(
  character: Character,
  attribute: string,
  ability: string,
  excellencyAbils: Array<string>,
  staticRating: boolean = false,
  stunt: boolean = false
) {
  let abili = ability
  if (abili.startsWith('craft')) abili = 'craft'
  if (abili.startsWith('martial arts')) abili = 'martial_arts'

  if (
    character.type === 'Character' ||
    (stunt && character.excellency_stunt === undefined) ||
    (stunt && character.excellency_stunt === '') ||
    !(
      excellencyAbils.includes(attribute) ||
      excellencyAbils.includes(abili) ||
      excellencyAbils.includes('*')
    )
  )
    return 0

  if (character.type === 'SolarCharacter')
    return SolarExcellency(character, attribute, ability, staticRating)
  else if (character.type === 'DragonbloodCharacter')
    return DbExcellency(character, attribute, ability, staticRating)

  return CustomExcellency(character, attribute, ability, staticRating, stunt)
}
