import { attr, abil, specialtiesFor } from '.'
import { ABILITIES, ATTRIBUTES } from '../constants.js'

export const canUseExcellency = (character, attribute, ability) => {
  const excellencies = character.excellencies_for
  if (excellencies.includes('*'))
    return true
  if (excellencies.includes(attribute) || excellencies.includes(ability))
    return true

  return false
}

export const highestOtherAbility = (character, ability) => {

}

export const highestOtherAttribute = (character, attribute) => {
  let result = ATTRIBUTES.filter((a) => a.attr !== `attr_${attribute}`).map((a) => character[a.attr])

  return Math.max(...result)
}

export function maxCustomExcellency(character, attribute, ability, stunt = false) {
  let excellency
  if (stunt)
    excellency = character.excellency_stunt
  else
    excellency = character.excellency

  let result = 0
  let i
  const exArray = excellency.split('+')
  for (i in exArray) {
    switch(exArray[i]) {
    case 'attribute':
      result += attr(character, attribute)
      break
    case 'attributeonanima':
      if (character.anima_level > 0)
        result += attr(character, attribute)
      break
    case 'ability':
      result += abil(character, ability)
      break
    case 'abilityonanima':
      if (character.anima_level > 0)
        result += abil(character, ability)
      break
    case 'specialty':
      if (specialtiesFor(character, ability).length > 0)
        result += 1
      break
    case 'essence':
      result += character.essence
      break
    case 'essenceonanima':
      if (character.anima_level > 0)
        result += character.essence
      break
    case 'otherability':
      break
    case 'otherattribute':
      result += highestOtherAttribute(character, attribute)
      break
    }
  }

  return result
}

export function maxExcellency(character, attribute, ability, stunt = false) {
  if (!canUseExcellency(character, attribute, ability))
    return 0

  switch (character.type) {
  case 'SolarCharacter':
    return attr(character, attribute) + abil(character, ability)
  case 'DragonbloodCharacter':
    return abil(character, ability) + specialtiesFor(character, ability).length > 0 ? 1 : 0
  case 'CustomAttributeCharacter':
  case 'CustomAbilityCharacter':
  case 'CustomEssenceCharacter':
    return maxCustomExcellency(character, attribute, ability, stunt)
  case 'Character':
  default:
    return 0
  }
}
