// @flow
import { attr, abil, specialtiesFor } from '..'
import { ABILITIES, ATTRIBUTES } from 'utils/constants.js'
import type { Character, Charm } from 'utils/flow-types'

export const excellencyAbils = (character: Character, charms: Array<Charm>) => {
  if (character.type === 'Character') return []

  let excellencies = character.excellencies_for || []

  if (character.type === 'SolarCharacter' || character.excellency === 'solar') {
    excellencies = excellencies
      .concat(character.caste_abilities.filter(a => abil(character, a) > 0))
      .concat(character.favored_abilities.filter(a => abil(character, a) > 0))

    if (
      excellencies.includes('brawl') &&
      character.abil_martial_arts.length > 0
    )
      excellencies = excellencies.concat(['martial_arts'])

    excellencies = excellencies.concat(
      charms.map(
        c => (c.charm_type === 'MartialArts' ? 'martial_arts' : c.ability)
      )
    )
  } else if (
    character.type === 'DragonbloodCharacter' ||
    character.excellency.startsWith('dragon')
  ) {
    excellencies = excellencies.concat(
      charms
        .filter(
          c =>
            c.keywords.includes('excellency') ||
            c.keywords.includes('Excellency')
        )
        .map(c => c.ability)
    )

    if (excellencies.includes('brawl'))
      excellencies = excellencies.concat(['martial_arts'])
  }

  return [...new Set(excellencies)]
}

export const highestOtherAbility = (character: Character, ability: string) => {
  let result = ABILITIES.filter(a => a.abil !== `abil_${ability}`).map(
    a => character[a.abil]
  )

  return Math.max(...result)
}

export const highestOtherAttribute = (
  character: Character,
  attribute: string
) => {
  let result = ATTRIBUTES.filter(a => a.attr !== `attr_${attribute}`).map(
    a => character[a.attr]
  )

  return Math.max(...result)
}

export function maxCustomExcellency(
  character: Character,
  attribute: string,
  ability: string,
  staticRating: boolean,
  stunt: boolean = false
) {
  let excellency
  if (stunt) excellency = character.excellency_stunt
  else excellency = character.excellency

  let result = 0
  let i
  const exArray = excellency.split('+')
  for (i in exArray) {
    switch (exArray[i]) {
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
        break
      case 'otherattribute':
        result += highestOtherAttribute(character, attribute)
        break
    }
  }

  if (!staticRating) return result
  if (exArray.includes('roundup')) return Math.ceil(result / 2)
  return Math.floor(result / 2)
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

  const attr_rating = attr(character, attribute)
  const abil_rating = abil(character, ability)

  if (character.type === 'SolarCharacter' || character.excellency === 'solar')
    return Math.floor((attr_rating + abil_rating) / (staticRating ? 2 : 1))
  if (
    character.type === 'DragonbloodCharacter' ||
    character.excellency.startsWith('dragon')
  )
    return Math.ceil(
      (abil_rating + (specialtiesFor(character, abili).length > 0 ? 1 : 0)) /
        (staticRating ? 2 : 1)
    )
  if (
    character.type === 'SiderealCharacter' ||
    character.excellency === 'sidereal'
  )
    return character.essence

  return maxCustomExcellency(character, attribute, ability, staticRating, stunt)
}
