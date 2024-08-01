// @flow
import { attr, abil, specialtiesFor } from '..'

import { halfRoundUp, halfRoundDown } from 'utils'
import { ABILITIES, ATTRIBUTES } from 'utils/constants.ts'
import type { Character } from 'utils/flow-types'

export const highestOtherAbility = (character: Character, ability: string) => {
  let result = ABILITIES.filter((a) => a.abil !== `abil_${ability}`).map(
    (a) => character[a.abil],
  )

  return Math.max(...result)
}

export const highestOtherAttribute = (
  character: Character,
  attribute: string,
) => {
  let result = ATTRIBUTES.filter((a) => a.attr !== `attr_${attribute}`).map(
    (a) => character[a.attr],
  )

  return Math.max(...result)
}

export default (
  character: Character,
  attribute: string,
  ability: string,
  staticRating: boolean,
  stunt: boolean = false,
) => {
  let excellency = stunt ? character.excellency_stunt : character.excellency
  let result = 0

  const exArray = excellency.split('+') || []
  for (let ex of exArray) {
    switch (ex) {
      case 'solar':
        result += attr(character, attribute) + abil(character, ability)
        break
      case 'dragonblood':
        result += abil(character, ability)
        if (specialtiesFor(character, ability).length > 0) result += 1
        break
      case 'lunar':
        result +=
          attr(character, attribute) +
          highestOtherAttribute(character, attribute)
        break
      case 'essenceor3':
      case 'sidereal':
        result += Math.max(character.essence, 3)
        break
      case 'attribute':
        result += attr(character, attribute)
        break
      case 'attributeonanima':
        if (character.anima_level > 0) result += attr(character, attribute)
        break
      case 'ability':
        result += abil(character, ability)
        break
      case 'abilityonanima':
        if (character.anima_level > 0) result += abil(character, ability)
        break
      case 'specialty':
        if (specialtiesFor(character, ability).length > 0) result += 1
        break
      case 'essence':
        result += character.essence
        break
      case 'essenceonanima':
        if (character.anima_level > 0) result += character.essence
        break
      case 'otherability':
        result += highestOtherAbility(character, ability)
        break
      case 'otherattribute':
        result += highestOtherAttribute(character, attribute)
        break
      case 'anima':
        result += character.anima_level
        break
      case 'subtleanima':
        result += 3 - character.anima_level
        break
      case 'initiative':
        result += character.initiative
        break
      case 'limit':
        result += character.limit
        break
      default:
        if (!isNaN(ex)) result += parseInt(ex)
    }
  }

  if (exArray.includes('max10')) result = Math.min(result, 10)

  if (
    exArray.includes('sidereal') ||
    !staticRating ||
    exArray.includes('nohalf')
  )
    return result

  if (exArray.includes('roundup')) return halfRoundUp(result)
  else return halfRoundDown(result)
}
