import { specialtiesFor, maxExcellency } from '.'

export function rating(character, attribute, ability, penalty) {
  const pool = character[`attr_${attribute}`] + character[`abil_${ability}`]
  const specialties = specialtiesFor(character, ability)
  return {
    raw: Math.ceil(pool / 2),
    specialtyMatters: pool % 2 === 0 && specialties.length > 0,
    specialties: specialties,
    excellency: Math.floor(maxExcellency(character, attribute, ability) / 2),
    penalty: penalty,
    total: Math.max(Math.ceil(pool / 2) - penalty, 0)
  }
}

export function evasion(character, merits, penalties) {
  let pen = penalties.wound + penalties.onslaught + penalties.mobility
  return rating(character, 'dexterity', 'dodge', pen)
}

export function resolve(character, merits, penalties) {
  return rating(character, 'wits', 'integrity', penalties.wound)
}

export function guile(character, merits, penalties) {
  return rating(character, 'manipulation', 'socialize', penalties.wound)
}

// TODO: factor in Invulnerable Skin of Bronze control spell bonus
export function soak (character, merits) {
  let bonus = 0
  let meritBonus = []

  let unusualHide = merits.find((m) => m.startsWith('unusual hide'))
  if (unusualHide != undefined) {
    bonus = parseInt(unusualHide.substr(-1))
    meritBonus = [{ label: 'unusual hide', bonus: bonus }]
  }
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
