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
    case 'AbyssalCharacter':
      return 'Abyssal '
    case 'AlchemicalCharacter':
      return 'Alchemical '
    case 'InfernalCharacter':
      return 'Infernal '
    default:
      return titleCase(character.exalt_type)
  }
}

export const prettyCanonType = (type: string) => {
  switch (type) {
    case 'Character':
      return 'Mortal'
    case 'SolarCharacter':
      return 'Solar Exalt'
    case 'DragonbloodCharacter':
      return 'Dragon-Blooded Exalt'
    case 'LunarCharacter':
      return 'Lunar Exalt'
    case 'SiderealCharacter':
      return 'Sidereal Exalt'
    case 'AbyssalCharacter':
      return 'Abyssal Exalt'
    case 'AlchemicalCharacter':
      return 'Alchemical Exalt'
    case 'InfernalCharacter':
      return 'Infernal Exalt'

    case 'CustomAbilityCharacter':
      return 'Ability-Based Exalt'
    case 'CustomAttributeCharacter':
      return 'Attribute-Based Exalt'
    case 'CustomEssenceCharacter':
      return 'Essence-Based Exalt / Spirit'
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
