// @flow
export * from './_battlegroups.js'
export * from './_excellencies.js'
export * from './_pools.js'
export * from './_qcs.js'
export * from './_ratings.js'
export * from './_weapons.js'

import { capitalize, includes } from 'lodash'
import {
  ATTRIBUTES, ABILITIES_ALL, ABILITIES_ALL_NO_MA,
  ATTACK_ABILITIES, NON_ATTACK_ABILITIES,
} from '../constants.js'
import type { fullChar } from '../propTypes/flow.js'

export function specialtiesFor(character: fullChar, ability) {
  return character.specialties.filter((s) => s.ability === ability).map((s) => s.context ) || []
}

/* Health */
export function totalHealthLevels(character) {
  return character.health_level_0s + character.health_level_1s +
    character.health_level_2s + character.health_level_4s +
    character.health_level_incap
}

export function woundPenalty(character, merits) {
  const totalDmg = character.damage_bashing + character.damage_lethal + character.damage_aggravated
  const lvl0 = character.health_level_0s
  const lvl1 = character.health_level_1s
  const lvl2 = character.health_level_2s
  const lvl4 = character.health_level_4s
  const modifier = merits.some((m) => m.startsWith('pain tolerance')) ? 1 : 0

  if (totalDmg <= lvl0) {
    return 0
  } else if (totalDmg <= (lvl0 + lvl1)) {
    return 1
  } else if (totalDmg <= (lvl0 + lvl1 + lvl2)) {
    return 2 - modifier
  } else if (totalDmg <= (lvl0 + lvl1 + lvl2 + lvl4)) {
    return 4 - modifier
  } else {
    return -1
  }
}

export function attackAbilities(character) {
  let abils = ATTACK_ABILITIES.filter((abil) => character[abil] > 0).map(function(abil) {
    let name = abil.substring(5)
    return {
      abil: name,
      rating: character[abil],
      specialties: character.specialties.filter((spec) => spec.ability == name),
    }
  })

  let mas = character.abil_martial_arts.map((abil)=> {
    let name = `martial arts (${ abil.style })`
    return {
      abil: name,
      rating: abil.rating,
      specialties: character.specialties.filter((spec) => spec.ability == 'martial arts'),
    }
  })

  return abils.concat(mas)
}

export function nonAttackAbilities(character) {
  let abils = NON_ATTACK_ABILITIES.filter((abil) => character[abil] > 0).map(function(abil) {
    let name = abil.substring(5)
    return {
      abil: name,
      rating: character[abil],
      specialties: character.specialties.filter((spec) => spec.ability == name),
    }
  })

  let crafts = character.abil_craft.map((abil)=> {
    let name = `craft (${ abil.craft })`
    return {
      abil: name,
      rating: abil.rating,
      specialties: character.specialties.filter((spec) => spec.ability == 'craft'),
    }
  })

  return abils.concat(crafts)
}

export function abilitiesWithRatings(character) {
  const abils = ABILITIES_ALL.filter((a) => {
    if (a.abil == 'abil_craft' || a.abil == 'abil_martial_arts')
      return character[a.abil].length > 0
    else
      return character[a.abil] > 0
  })

  return abils
}

export function nonCasteAbilities(character) {
  const abils = ABILITIES_ALL_NO_MA.filter((a) => {
    return !character.caste_abilities.includes(a.pretty.toLowerCase())
  })

  return abils
}

export function nonCasteAttributes(character) {
  const attrs = ATTRIBUTES.filter((a) => {
    return !character.caste_attributes.includes(a.pretty.toLowerCase())
  })

  return attrs
}

export function mobilityPenalty(character) {
  switch(character.armor_weight) {
  case 'heavy':
    return 2
  case 'medium':
    return 1
  case 'light':
  case 'unarmored':
  default:
    return 0
  }
}

export function hardness(character) {
  let hardness = 0
  if (character.armor_is_artifact) {
    switch(character.armor_weight) {
    case 'light':
      hardness = 4
      break
    case 'medium':
      hardness = 7
      break
    case 'heavy':
      hardness = 10
    }
  }
  // Twilight caste anima power grants 5 hardness at Bonfire/Iconic
  if ( character.type !== 'Character' &&
    character.exalt_type.toLowerCase() === 'solar' &&
    character.caste.toLowerCase() === 'twilight' &&
    character.anima_level === 3
  )
    hardness = Math.max(hardness, 5)

  return hardness
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

  return `${capitalize(character.caste || '?')} ${character.aspect ? 'Aspect' : 'Caste'} ${prettyExaltType(character) || 'Exalt'}`
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
  switch(rating) {
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
  switch(rating) {
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

export function hasAura(character) {
  return character.type === 'DragonbloodCharacter' ||
    character.type === 'CustomAbilityCharacter' ||
    character.type === 'CustomAttributeCharacter' ||
    character.type === 'CustomEssenceCharacter'
}

export function isCasteAbility(character, ability) {
  return character.caste_abilities && includes(character.caste_abilities, ability)
}

export function isSupernalAbility(character, ability) {
  return character.supernal_ability === ability
}

export function isFavoredAbility(character, ability) {
  return character.favored_abilities && includes(character.favored_abilities, ability)
}

export function isCasteAttribute(character, attribute) {
  return character.caste_attributes && includes(character.caste_attributes, attribute)
}

export function isFavoredAttribute(character, attribute) {
  return character.favored_attributes && includes(character.favored_attributes, attribute)
}

export function committedPersonalMotes(character) {
  return character.motes_committed.filter((c) => c.pool == 'personal' ).reduce((total, c) => total + c.motes, 0)
}

export function committedPeripheralMotes(character) {
  return character.motes_committed.filter((c) => c.pool == 'peripheral' ).reduce((total, c) => total + c.motes, 0)
}
