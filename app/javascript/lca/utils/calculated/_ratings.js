// @flow
import { specialtiesFor } from '.'
import { maxExcellency } from './_excellencies.js'
import { attr, abil } from './_pools.js'
import type { fullChar } from '../propTypes/flow.js'

export function rating(
  name: string,
  character: fullChar,
  attribute: string,
  ability: string,
  penalties: Array<Object>,
  charmAbils: Array<string>,
  bonus: Array<Object> = [],
) {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  const specialties = specialtiesFor(character, ability)

  const excellency = maxExcellency(character, attribute, ability, charmAbils, true)
  const excellencyStunt = maxExcellency(character, attribute, ability, charmAbils, true, true)
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0)

  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: Math.ceil(pool / 2),
    specialtyMatters: pool % 2 === 0 && specialties.length > 0,
    specialties: specialties,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalties: penalties.filter((p) => p.penalty > 0),
    total: Math.max(Math.ceil(pool / 2) - penalty, 0),
    bonus: bonus,
    rating: true,
  }
}

export function evasion(
  character: fullChar,
  merits: Array<string>,
  penalties: Object,
  charmAbils: Array<string>,
) {
  const pen = [
    { label: 'wound', penalty: penalties.wound },
    { label: 'mobility', penalty: penalties.mobility },
    { label: 'onslaught', penalty: penalties.onslaught },
  ]
  return rating('Evasion', character, 'dexterity', 'dodge', pen, charmAbils)
}

export function resolve(
  character: fullChar,
  merits: Array<string>,
  penalties: Object,
  charmAbils: Array<string>,
) {
  const pen = [{ label: 'Wound', penalty: penalties.wound }]
  let bonus = []
  let wellBred = merits.find((m) => m.startsWith('well-bred'))
  if (wellBred !== undefined)
    bonus = bonus.concat([{ label: 'well-bred', bonus: 1, situational: true }])

  let thinBlood = merits.find((m) => m.startsWith('thin-blooded'))
  if (thinBlood !== undefined)
    bonus = bonus.concat([{ label: 'thin-blooded', bonus: -1, situational: true }])

  return rating('Resolve', character, 'wits', 'integrity', pen, charmAbils, bonus)
}

export function guile(
  character: fullChar,
  merits: Array<string>,
  penalties: Object,
  charmAbils: Array<string>,
) {
  const pen = [{ label: 'Wound', penalty: penalties.wound }]
  return rating('Guile', character, 'manipulation', 'socialize', pen, charmAbils)
}

export function appearanceRating(
  character: { attr_appearance: number },
  merits: Array<string>,
) { // eslint-disable-line no-unused-vars
  let bonus = []

  let hideous = merits.find((m) => m.startsWith('hideous'))
  if (hideous != undefined)
    bonus = [{ label: 'hideous', bonus: 0 }]

  return {
    name: 'Appearance',
    attribute: 'Appearance',
    attributeRating: character.attr_appearance,
    bonus: bonus,
    total: character.attr_appearance,
  }
}

export const naturalSoak = (character: fullChar) => character.attr_stamina

export function armorSoak(character: fullChar) {
  switch(character.armor_weight) {
  case 'light':
    return character.armor_is_artifact ? 5 : 3
  case 'medium':
    return character.armor_is_artifact ? 8 : 5
  case 'heavy':
    return character.armor_is_artifact ? 11 : 7
  case 'unarmored':
  default:
    return 0
  }
}

export function soak(
  character: fullChar,
  merits: Array<string>,
  spells: Array<string>,
) {
  let b = 0
  let bonus = []
  const bonfire = character.anima_level === 3

  let unusualHide = merits.find((m) => m.startsWith('unusual hide'))
  if (unusualHide != undefined) {
    b += parseInt(unusualHide.substr(-1))
    bonus = bonus.concat([{ label: 'unusual hide', bonus: parseInt(unusualHide.substr(-1)) }])
  }
  let isob = spells.find((s) => s === 'invulnerable skin of bronze')
  if (isob != undefined && character.armor_weight === 'unarmored') {
    b += 3
    bonus = bonus.concat([{ label: 'invulnerable skin of bronze', bonus: 3 }])
  }

  // Earth aspect DBs gain higher of 3 or (essence) to soak generally
  // Fire aspect DBs gain (essence) soak vs heat
  if (character.type !== 'Character' &&
    (character.type === 'DragonbloodCharacter' || character.exalt_type.toLowerCase().startsWith('dragon'))
  ) {
    switch (character.caste.toLowerCase()) {
    case 'earth':
      if (bonfire) {
        b += Math.max(character.essence, 3)
        bonus = bonus.concat([{ label: 'anima', bonus: Math.max(character.essence, 3) }])
      } else {
        bonus = bonus.concat([{ label: '/3m anima', bonus: Math.max(character.essence, 3), situational: true }])
      }
      break
    case 'fire':
      bonus = bonus.concat([{ label: `${bonfire ? '' : '/5m '}vs heat`, bonus: character.essence, situational: true }])
      break
    }
  }

  return {
    name: 'Soak',
    natural: naturalSoak(character),
    bonus: bonus,
    armored: armorSoak(character),
    total: naturalSoak(character) + armorSoak(character) + b,
    soak: true,
  }
}

export function hardness(character: fullChar) {
  let armor = 0
  let b = 0
  let altTotal = 0
  let bonus = []
  const bonfire = character.anima_level === 3

  if (character.armor_is_artifact) {
    switch(character.armor_weight) {
    case 'light':
      armor = 4
      break
    case 'medium':
      armor = 7
      break
    case 'heavy':
      armor = 10
    }
  }

  if (character.type !== 'Character') {
    // Twilight caste anima power grants 5 hardness at Bonfire/Iconic
    if (
      (character.type === 'SolarCharacter' || character.exalt_type.toLowerCase() === 'solar') &&
      character.caste.toLowerCase() === 'twilight'
    ) {
      if (bonfire) {
        altTotal = 5
        bonus = bonus.concat([{ label: '5 anima' }])
      } else {
        bonus = bonus.concat([{ label: '5/5m anima', situational: true }])
      }
    }

    if (
      character.type === 'DragonbloodCharacter' ||
      character.exalt_type.toLowerCase().startsWith('dragon')
    ) {
      switch(character.caste.toLowerCase()) {
      // Earth aspects get +1 hardness for 3m, or free at Bonfire
      case 'earth':
        if (bonfire) {
          b += 1
          bonus = bonus.concat([{ label: 'anima', bonus: 1 }])
        } else
          bonus = bonus.concat([{ label: '/3m anima', bonus: 1, situational: true }])
        break

      // Fire aspects get +2 hardness vs heat for 5m, or free at Bonfire
      case 'fire':
        bonus = bonus.concat([{ label: `${bonfire ? '2' : '2/5m'} vs heat`, situational: true }])
        break
      }
    }
  }

  return {
    name: 'Hardness',
    armored: armor,
    bonus: bonus,
    total: Math.max(armor + b, altTotal),
  }
}
