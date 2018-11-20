// @flow
export * from './_battlegroups.js'
export * from './_qcs.js'
export * from './excellencies'
export * from './pools'
export * from './ratings'
export * from './weapons'

import { capitalize } from 'lodash'
import {
  ATTRIBUTES,
  ABILITIES_ALL,
  ABILITIES_ALL_NO_MA,
  ATTACK_ABILITIES,
  NON_ATTACK_ABILITIES,
} from '../constants.js'
import type { Character, withHealthLevels, withArmorStats } from '../flow-types'

export const attr = (character: Character, attribute: string) =>
  attribute === 'essence' ? character.essence : character[`attr_${attribute}`]
export const abil = (character: Character, ability: string) => {
  let abil
  if (ability.startsWith('martial arts')) {
    abil = character.abil_martial_arts.find(
      art => `martial arts (${art.style})` === ability
    )
    return abil !== undefined ? abil.rating : 0
  } else if (ability === 'craft') {
    // Checking 'craft' without parenthesis only happens when checking for Solar
    // Excellencies, so we don't need an exact number here
    if (character.abil_craft.length === 0) return 0
    return 1
  } else if (ability.startsWith('craft')) {
    abil = character.abil_craft.find(
      craft => `craft (${craft.craft})` == ability
    )
    return abil != undefined ? abil.rating : 0
  } else {
    return character[`abil_${ability}`]
  }
}

export const specialtiesFor = (character: Character, ability) => {
  let abili = ability
  if (abili.startsWith('martial arts')) abili = 'martial_arts'
  else if (abili.startsWith('craft')) abili = 'craft'
  return (
    character.specialties
      .filter(s => s.ability === abili)
      .map(s => s.context) || []
  )
}

/* Health */
export const totalHealthLevels = (character: withHealthLevels) =>
  character.health_level_0s +
  character.health_level_1s +
  character.health_level_2s +
  character.health_level_4s +
  character.health_level_incap

export function woundPenalty(character, merits) {
  const totalDmg =
    character.damage_bashing +
    character.damage_lethal +
    character.damage_aggravated
  const lvl0 = character.health_level_0s
  const lvl1 = lvl0 + character.health_level_1s
  const lvl2 = lvl1 + character.health_level_2s
  const lvl4 = lvl2 + character.health_level_4s
  const modifier = merits.some(m => m.startsWith('pain tolerance')) ? 1 : 0

  if (totalDmg <= lvl0) {
    return 0
  } else if (totalDmg <= lvl1) {
    return 1
  } else if (totalDmg <= lvl2) {
    return 2 - modifier
  } else if (totalDmg <= lvl4) {
    return 4 - modifier
  } else {
    // TODO: change penalty or pools on incap?
    return 4 - modifier
  }
}

export function attackAbilities(character) {
  let abils = ATTACK_ABILITIES.map(abil => {
    let name = abil.substring(5)
    return {
      abil: name,
      rating: character[abil] || 0,
      specialties: character.specialties.filter(spec => spec.ability == name),
    }
  })

  let mas = character.abil_martial_arts.map(abil => {
    let name = `martial arts (${abil.style})`
    return {
      abil: name,
      rating: abil.rating,
      specialties: character.specialties.filter(
        spec => spec.ability == 'martial arts'
      ),
    }
  })

  return abils.concat(mas)
}

export function nonAttackAbilities(character) {
  let abils = NON_ATTACK_ABILITIES.filter(abil => character[abil] > 0).map(
    function(abil) {
      let name = abil.substring(5)
      return {
        abil: name,
        rating: character[abil] || 0,
        specialties: character.specialties.filter(spec => spec.ability == name),
      }
    }
  )

  let crafts = character.abil_craft.map(abil => {
    let name = `craft (${abil.craft})`
    return {
      abil: name,
      rating: abil.rating,
      specialties: character.specialties.filter(
        spec => spec.ability == 'craft'
      ),
    }
  })

  return abils.concat(crafts)
}

export function abilitiesWithRatings(character) {
  const abils = ABILITIES_ALL.filter(a => {
    if (a.abil === 'abil_craft' || a.abil === 'abil_martial_arts')
      return character[a.abil].length > 0
    else return character[a.abil] > 0
  })

  return abils
}

export const nonCasteAbilities = (character: Character) =>
  ABILITIES_ALL_NO_MA.filter(a => {
    return !(character.caste_abilities || []).includes(a.pretty.toLowerCase())
  })

export const nonCasteAttributes = (character: Character) =>
  ATTRIBUTES.filter(a => {
    return !(character.caste_attributes || []).includes(a.pretty.toLowerCase())
  })

export function mobilityPenalty(character: withArmorStats) {
  switch (character.armor_weight) {
    case 'heavy':
      return 2 + character.bonus_mobility_penalty
    case 'medium':
      return 1 + character.bonus_mobility_penalty
    case 'light':
    case 'unarmored':
    default:
      return 0 + character.bonus_mobility_penalty
  }
}

export function prettyExaltType(character) {
  switch (character.type) {
    case 'Character':
      return character.is_sorcerer ? 'Sorcerer' : 'Mortal'
    case 'SolarCharacter':
      return 'Solar'
    case 'DragonbloodCharacter':
      return 'Dragon-Blooded'
    default:
      return character.exalt_type
  }
}

export function prettyFullExaltType(character) {
  if (character.type == 'Character')
    return character.is_sorcerer ? 'Non-Exalt Sorcerer' : 'Mortal'

  let caste =
    character.caste === ''
      ? ''
      : capitalize(character.caste) +
        (character.aspect ? ' Aspect ' : ' Caste ')

  return `${caste}${prettyExaltType(character) || 'Exalt'}`
}

export function exaltTypeBase(character) {
  switch (character.type) {
    case 'SolarCharacter':
    case 'DragonbloodCharacter':
    case 'CustomAbilityCharacter':
      return 'ability'
    case 'CustomAttributeCharacter':
      return 'attribute'
    case 'CustomEssenceCharacter':
      return 'essence'
    case 'Character':
    default:
      return 'none'
  }
}

export function prettyIntimacyRating(rating) {
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

export function prettyAnimaLevel(rating) {
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

export const hasAura = character =>
  character.type === 'DragonbloodCharacter' ||
  character.type === 'CustomAbilityCharacter' ||
  character.type === 'CustomAttributeCharacter' ||
  character.type === 'CustomEssenceCharacter'

export const isCasteAbility = (character, ability) =>
  character.caste_abilities && character.caste_abilities.includes(ability)

export const isSupernalAbility = (character, ability) =>
  character.supernal_ability === ability

export const isFavoredAbility = (character, ability) =>
  character.favored_abilities && character.favored_abilities.includes(ability)

export const isCasteAttribute = (character, attribute) =>
  character.caste_attributes && character.caste_attributes.includes(attribute)

export const isFavoredAttribute = (character, attribute) =>
  character.favored_attributes &&
  character.favored_attributes.includes(attribute)

export const committedPersonalMotes = character =>
  character.motes_committed
    .filter(c => c.pool == 'personal')
    .reduce((total, c) => total + c.motes, 0)

export const committedPeripheralMotes = character =>
  character.motes_committed
    .filter(c => c.pool == 'peripheral')
    .reduce((total, c) => total + c.motes, 0)

export const spentXp = character =>
  character.xp_log.reduce((total, c) => total + c.points, 0)

export const spentSolarXp = character =>
  character.xp_log_solar.reduce((total, c) => total + c.points, 0)

export const spentBp = character =>
  character.bp_log.reduce((total, c) => total + c.points, 0)

export const penaltyObject = (
  penalties,
  {
    useWound = true,
    useMobility = false,
    usePoison = true,
    useOnslaught = false,
  }: {
    useWound?: boolean,
    useMobility?: boolean,
    usePoison?: boolean,
    useOnslaught?: boolean,
  } = {}
) => {
  let penalty = []
  if (useWound)
    penalty = [...penalty, { label: 'wound', penalty: penalties.wound }]
  if (useMobility)
    penalty = [...penalty, { label: 'mobility', penalty: penalties.mobility }]
  if (usePoison)
    penalty = [...penalty, { label: 'poison', penalty: penalties.poisonTotal }]
  if (useOnslaught)
    penalty = [...penalty, { label: 'onslaught', penalty: penalties.onslaught }]
  return penalty
}
