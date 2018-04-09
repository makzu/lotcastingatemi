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
) {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  const specialties = specialtiesFor(character, ability)

  const excellency = Math.floor(maxExcellency(character, attribute, ability, charmAbils) / 2)
  const excellencyStunt = Math.floor(maxExcellency(character, attribute, ability, charmAbils, true) / 2)
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0 )

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
  return rating('Resolve', character, 'wits', 'integrity', pen, charmAbils)
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
  let meritBonus = []

  let hideous = merits.find((m) => m.startsWith('hideous'))
  if (hideous != undefined)
    meritBonus = [{ label: 'hideous', bonus: 0 }]

  return {
    name: 'Appearance',
    attribute: 'Appearance',
    attributeRating: character.attr_appearance,
    meritBonus: meritBonus,
    total: character.attr_appearance,
  }
}

export function soak(
  character: fullChar,
  merits: Array<string>,
  spells: Array<string>,
) {
  let bonus = 0
  let meritBonus = []

  let unusualHide = merits.find((m) => m.startsWith('unusual hide'))
  if (unusualHide != undefined) {
    bonus += parseInt(unusualHide.substr(-1))
    meritBonus = meritBonus.concat([{ label: 'unusual hide', bonus: bonus }])
  }
  let isob = spells.find((s) => s === 'invulnerable skin of bronze')
  if (isob != undefined && character.armor_weight === 'unarmored') {
    meritBonus = meritBonus.concat([{ label: 'invulnerable skin of bronze', bonus: 3 }])
    bonus += 3
  }

  return {
    name: 'Soak',
    natural: character.attr_stamina,
    meritBonus: meritBonus,
    armored: armorSoak(character),
    total: character.attr_stamina + bonus + armorSoak(character),
    soak: true,
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
