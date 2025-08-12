// @flow
export * from './_battlegroups.js'
export * from './_qcs.js'
export * from './excellencies'
export * from './pools'
export * from './ratings'
export * from './weapons'
export * from './pretty'

import {
  ATTRIBUTES,
  ABILITIES_ALL,
  ABILITIES_ALL_NO_MA,
  ATTACK_ABILITIES,
  NON_ATTACK_ABILITIES,
} from '../constants.ts'
import type {
  Character,
  withHealthLevels,
  withMotePool,
  withArmorStats,
  specialty,
} from '../flow-types'

export const attr = (character: Character, attribute: string): number =>
  attribute === 'essence'
    ? character.essence
    : character[`attr_${attribute}`] || 0

export const abil = (character: Character, ability: string): number => {
  let abil
  if (ability.startsWith('martial arts')) {
    abil = character.abil_martial_arts.find(
      (art) => `martial arts (${art.style})` === ability,
    )
    return abil !== undefined ? abil.rating : 0
  } else if (ability === 'craft') {
    // Checking 'craft' without parenthesis only happens when checking for Solar
    // Excellencies, so we don't need an exact number here
    if (character.abil_craft.length === 0) return 0
    return 1
  } else if (ability.startsWith('craft')) {
    abil = character.abil_craft.find(
      (craft) => `craft (${craft.craft})` === ability,
    )
    return abil != undefined ? abil.rating : 0
  } else {
    return character[`abil_${ability}`] || 0
  }
}

export const specialtiesFor = (
  character: Character,
  ability: string,
): Array<string> => {
  let abili = ability
  if (abili.startsWith('martial arts')) abili = 'martial_arts'
  else if (abili.startsWith('craft')) abili = 'craft'
  return (
    character.specialties
      .filter((s) => s.ability === abili)
      .map((s) => s.context) || []
  )
}

/* Health */
export const totalHealthLevels = (character: withHealthLevels) =>
  character.health_level_0s +
  character.health_level_1s +
  character.health_level_2s +
  character.health_level_4s +
  character.health_level_incap

export function woundPenalty(
  character: withHealthLevels,
  merits: Array<string>,
) {
  const totalDmg =
    character.damage_bashing +
    character.damage_lethal +
    character.damage_aggravated
  const lvl0 = character.health_level_0s
  const lvl1 = lvl0 + character.health_level_1s
  const lvl2 = lvl1 + character.health_level_2s
  const lvl4 = lvl2 + character.health_level_4s
  const modifier = merits.some((m) => m.startsWith('pain tolerance')) ? 1 : 0

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

export function attackAbilities(
  character: Character,
): Array<{ abil: string, rating: number, specialties: Array<specialty> }> {
  let abils = ATTACK_ABILITIES.map((abil) => {
    let name = abil.substring(5)
    return {
      abil: name,
      rating: character[abil] || 0,
      specialties: character.specialties.filter((spec) => spec.ability == name),
    }
  })

  let mas = character.abil_martial_arts.map((abil) => {
    let name = `martial arts (${abil.style})`
    return {
      abil: name,
      rating: abil.rating,
      specialties: character.specialties.filter(
        (spec) => spec.ability == 'martial arts',
      ),
    }
  })

  return abils.concat(mas)
}

export function nonAttackAbilities(
  character: Character,
): Array<{ abil: string, rating: number, specialties: Array<specialty> }> {
  let abils = NON_ATTACK_ABILITIES.filter((abil) => character[abil] > 0).map(
    function (abil) {
      let name = abil.substring(5)
      return {
        abil: name,
        rating: character[abil] || 0,
        specialties: character.specialties.filter(
          (spec) => spec.ability == name,
        ),
      }
    },
  )

  let crafts = character.abil_craft.map((abil) => {
    let name = `craft (${abil.craft})`
    return {
      abil: name,
      rating: abil.rating,
      specialties: character.specialties.filter(
        (spec) => spec.ability == 'craft',
      ),
    }
  })

  return abils.concat(crafts)
}

export function abilitiesWithRatings(character: Character): Array<Object> {
  const abils = ABILITIES_ALL.filter((a) => {
    if (a.abil === 'abil_craft' || a.abil === 'abil_martial_arts')
      return character[a.abil].length > 0
    else return character[a.abil] > 0
  })

  return abils
}

export const nonCasteAbilities = (character: Character): Array<Object> =>
  ABILITIES_ALL_NO_MA.filter((a) => {
    return !(character.caste_abilities || []).includes(a.pretty.toLowerCase())
  })

export const nonCasteAttributes = (character: Character): Array<Object> =>
  ATTRIBUTES.filter((a) => {
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

export const isCustomCharacter = (character: Character) =>
  character.type === 'CustomAbilityCharacter' ||
  character.type === 'CustomAttributeCharacter' ||
  character.type === 'CustomEssenceCharacter'

export const showAuraTraits = (character: Character) =>
  character.type === 'DragonbloodCharacter' || isCustomCharacter(character)

export const showLunarTraits = (character: Character) =>
  character.type === 'LunarCharacter' || isCustomCharacter(character)

export const isCasteAbility = (character: Character, ability: string) =>
  character.caste_abilities && character.caste_abilities.includes(ability)

export const isSupernalAbility = (character: Character, ability: string) =>
  character.supernal_ability === ability

export const isFavoredAbility = (character: Character, ability: string) =>
  character.favored_abilities && character.favored_abilities.includes(ability)

export const isCasteAttribute = (character: Character, attribute: string) =>
  character.caste_attributes && character.caste_attributes.includes(attribute)

export const isFavoredAttribute = (character: Character, attribute: string) =>
  character.favored_attributes &&
  character.favored_attributes.includes(attribute)

export const committedPersonalMotes = (character: withMotePool) =>
  character.motes_committed
    .filter((c) => c.pool === 'personal')
    .reduce((total, c) => total + c.motes, 0)

export const committedPeripheralMotes = (character: withMotePool) =>
  character.motes_committed
    .filter((c) => c.pool === 'peripheral')
    .reduce((total, c) => total + c.motes, 0)

export const spentXp = (character: Character) =>
  character.xp_log.reduce((total, c) => total + c.points, 0)

export const spentSolarXp = (character: Character) =>
  character.xp_log_solar.reduce((total, c) => total + c.points, 0)

export const spentBp = (character: Character) =>
  character.bp_log.reduce((total, c) => total + c.points, 0)

export const penaltyObject = (
  penalties: Object,
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
  } = {},
) => {
  let penalty = []
  if (useWound)
    penalty = [...penalty, { label: 'wound', penalty: penalties.wound }]
  if (useMobility)
    penalty = [...penalty, { label: 'mobility', penalty: penalties.mobility }]
  if (usePoison)
    penalty = [
      ...penalty,
      { label: 'poison', penalty: penalties.poisonTotal || 0 },
    ]
  if (useOnslaught)
    penalty = [
      ...penalty,
      { label: 'onslaught', penalty: penalties.onslaught || 0 },
    ]
  return penalty
}
