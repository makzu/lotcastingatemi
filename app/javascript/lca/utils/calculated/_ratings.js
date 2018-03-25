import { specialtiesFor, maxExcellency } from '.'

export function rating(character, attribute, ability, penalty, charmAbils) {
  const pool = character[`attr_${attribute}`] + character[`abil_${ability}`]
  const specialties = specialtiesFor(character, ability)

  const excellency = Math.floor(maxExcellency(character, attribute, ability, charmAbils) / 2)
  const excellencyStunt = Math.floor(maxExcellency(character, attribute, ability, charmAbils, true) / 2)

  return {
    raw: Math.ceil(pool / 2),
    specialtyMatters: pool % 2 === 0 && specialties.length > 0,
    specialties: specialties,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalty: penalty,
    total: Math.max(Math.ceil(pool / 2) - penalty, 0)
  }
}

export function evasion(character, merits, penalties, charmAbils) {
  let pen = penalties.wound + penalties.onslaught + penalties.mobility
  return rating(character, 'dexterity', 'dodge', pen, charmAbils)
}

export function resolve(character, merits, penalties, charmAbils) {
  return rating(character, 'wits', 'integrity', penalties.wound, charmAbils)
}

export function guile(character, merits, penalties, charmAbils) {
  return rating(character, 'manipulation', 'socialize', penalties.wound, charmAbils)
}

export function soak(character, merits, spells) {
  let bonus = 0
  let meritBonus = []

  let unusualHide = merits.find((m) => m.startsWith('unusual hide'))
  if (unusualHide != undefined) {
    bonus = parseInt(unusualHide.substr(-1))
    meritBonus = meritBonus.concat([{ label: 'unusual hide', bonus: bonus }])
  }
  let isob = spells.find((s) => s.name == 'invulnerable skin of bronze')
  if (isob != undefined && character.armor_weight === 'unarmored')
    meritBonus = meritBonus.concat([{ label: 'invulnerable skin of bronze', bonus: 3 }])

  return {
    natural: character.attr_stamina,
    meritBonus: meritBonus,
    armored: armorSoak(character),
    total: character.attr_stamina + bonus + armorSoak(character),
    specialties: [],
  }
}

export const naturalSoak = (character) => character.attr_stamina

export function armorSoak(character) {
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
