// @flow
import SolarExcellency, {
  solarExcellencyAbils,
  hasSolarExcellency,
} from './solar.js'
import DbExcellency, {
  dbExcellencyAbils,
  hasDbExcellency,
} from './dragonblooded.js'
import CustomExcellency from './custom.js'
import type { Character, Charm } from 'utils/flow-types'

export const excellencyAbils = (
  character: Character,
  charms: Array<Charm>
): Array<string> => {
  // Mortals do not have excellencies
  if (character.type === 'Character') return []

  let excellencies: Array<string> = character.excellencies_for || []

  if (hasSolarExcellency(character)) {
    excellencies = excellencies.concat(solarExcellencyAbils(character, charms))
  } else if (hasDbExcellency(character)) {
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

  if (hasSolarExcellency(character))
    return SolarExcellency(character, attribute, ability, staticRating)
  if (hasDbExcellency(character))
    return DbExcellency(character, attribute, ability, staticRating)

  // FEATURE: Setting excellency to 'sidereal' will set the excellency cap for pools and ratings to (Essence). You must still select which attrs/abils have excellencies.
  if (
    character.type === 'SiderealCharacter' ||
    character.excellency === 'sidereal'
  )
    return character.essence

  return CustomExcellency(character, attribute, ability, staticRating, stunt)
}
