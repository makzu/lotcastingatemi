// @flow

// $FlowFixMe
import { Character } from 'types'
import { capitalize, titleCase } from '..'

export const solarXpName = (character: Character) =>
  capitalize(character.exalt_type.split(/[ -]/)[0] || 'solar')

export function prettyExaltType(character: Character) {
  switch (character.type) {
    case 'SolarCharacter':
      return 'Solar'
    case 'DragonbloodCharacter':
      return 'Dragon-Blooded'
    case 'LunarCharacter':
      return 'Lunar'
    case 'SiderealCharacter':
      return 'Sidereal'
    default:
      return titleCase(character.exalt_type)
  }
}

const prettyCaste = (character: Character) => {
  let casteLabel = character.aspect ? ' Aspect ' : ' Caste '
  if ((character.caste || '').toLowerCase() === 'casteless') {
    casteLabel = ' '
  }
  return character.caste === '' || character.caste == null
    ? ''
    : titleCase(character.caste) + casteLabel
}

export function prettyFullExaltType(character: Character) {
  if (character.type === 'Character') {
    return character.is_sorcerer ? 'Sorcerer' : 'Mortal'
  }

  return `${prettyCaste(character)}${prettyExaltType(character) || 'Exalt'}`
}

export const prettyCompactExaltType = (character: Character) => {
  if (character.type === 'Character') {
    return character.is_sorcerer ? 'Sorcerer' : 'Mortal'
  }
  const totem = character.totem ? titleCase(character.totem) + ' Totem ' : ''

  return `${totem}${prettyCaste(character)}`
}

export function exaltTypeBase(character: Character) {
  switch (character.type) {
    case 'SolarCharacter':
    case 'DragonbloodCharacter':
    case 'SiderealCharacter':
    case 'AbyssalCharacter':
    case 'InfernalCharacter':
    case 'CustomAbilityCharacter':
      return 'ability'
    case 'LunarCharacter':
    case 'AlchemicalCharacter':
    case 'CustomAttributeCharacter':
      return 'attribute'
    case 'CustomEssenceCharacter':
      return 'essence'
    case 'Character':
    default:
      return 'none'
  }
}

export function prettyIntimacyRating(rating: number) {
  switch (rating) {
    case 3:
      return 'Defining'
    case 2:
      return 'Major'
    case 1:
      return 'Minor'
    default:
      return 'N/A'
  }
}

export function prettyAnimaLevel(rating: number) {
  switch (rating) {
    case 3:
      return 'Bonfire'
    case 2:
      return 'Burning'
    case 1:
      return 'Glowing'
    case 0:
    default:
      return 'Dim'
  }
}
