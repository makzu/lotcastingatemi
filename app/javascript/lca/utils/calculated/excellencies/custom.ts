import type { Character } from '@/types'
import { halfRoundDown, halfRoundUp } from '@/utils'
import { ABILITIES ,type  Ability  } from '@/utils/constants.new/abilities';
import { ATTRIBUTES ,type  Attribute  } from '@/utils/constants.new/attributes';
import { abil, attr, specialtiesFor } from '..'

export const highestOtherAbility = (character: Character, ability: Ability) => {
  const result = ABILITIES.filter((a) => a !== ability).map((a) =>
    abil(character, a),
  )
  return Math.max(...result)
}
export const highestOtherAttribute = (
  character: Character,
  attribute: Attribute,
) => {
  const result = ATTRIBUTES.filter((a) => a !== attribute).map((a) =>
    attr(character, a),
  )
  return Math.max(...result)
}
export default (
  character: Character,
  attribute: Attribute,
  ability: Ability,
  staticRating: boolean,
  stunt = false,
) => {
  const excellency = stunt ? character.excellency_stunt : character.excellency
  let result = 0
  const exArray = excellency.split('+') || []
  for (const ex of exArray) {
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
