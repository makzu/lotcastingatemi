import { specialtiesFor, maxExcellency, attr, abil } from '.'

// Mortal melee/ma weapons: p.580
// Mortal thrown weapons:   p.587
// Mortal archery weapons:  p.588

export function weaponAccuracyBonus(weapon) {
  switch(weapon.weight) {
  case 'light':
    return weapon.is_artifact ? 5 : 4
  case 'medium':
    return weapon.is_artifact ? 3 : 2
  case 'heavy':
    return weapon.is_artifact ? 1 : 0
  }
}

export function archeryAccuracyBonus(weapon, range) {
  // close -2, short +4, medium +2, long +0, extreme -2
  // close -1, short +5, medium +3, long +1, extreme -1
  let bonus = 0
  switch(range) {
  case 'extreme':
    bonus = -2
    break
  case 'long':
    bonus = 0
    break
  case 'medium':
    bonus = 2
    break
  case 'short':
    bonus = 4
    break
  case 'close':
  default:
    bonus = -2
    break
  }

  if (weapon.is_artifact)
    bonus += 1

  return bonus
}

export function thrownAccuracyBonus(weapon, range) {
  // regular  close +4, short +3, medium +2, long -1, extreme -3
  // artifact close +5, short +4, medium +3, long +0, extreme -2
  let bonus = 0
  switch(range) {
  case 'extreme':
    bonus = -3
    break
  case 'long':
    bonus = -1
    break
  case 'medium':
    bonus = 2
    break
  case 'short':
    bonus = 3
    break
  case 'close':
  default:
    bonus = +4
    break
  }

  if (weapon.is_artifact)
    bonus += 1

  return bonus
}

const rangeTag = (weapon) => (
  weapon.tags.find((t) => (
    t.toLowerCase().startsWith('thrown') ||
    t.toLowerCase().startsWith('archery')
  ))
)

const rangeValue = (weapon) => {
  const tag = rangeTag(weapon)
  if (tag == undefined)
    return 0

  const rangeRegex = /\(([^)]+)\)/.exec(tag)
  let range
  if (rangeRegex != null)
    range = rangeRegex[1].toLowerCase()
  switch(range) {
  case 'extreme':
    return 4
  case 'long':
    return 3
  case 'medium':
    return 2
  case 'short':
    return 1
  case 'close':
  default:
    return 0
  }
}

export function weaponIsRanged(weapon) {
  const tag = rangeTag(weapon)
  if(['archery', 'thrown'].includes(weapon.ability))
    return true

  if(['melee', 'brawl'].includes(weapon.ability))
    return false

  if (tag != undefined)
    return true

  return false
}

export function weaponDamageBonus(weapon) {
  let damage = 0

  switch(weapon.weight) {
  case 'medium':
    damage = 9
    break
  case 'heavy':
    damage = 11
    break
  case 'light':
  default:
    damage = 7
    break
  }

  if (weapon.is_artifact)
    damage += 3

  if (weapon.tags.includes('shield'))
    damage -= 2

  return damage
}

export function weaponDamageType(weapon) {
  if (weapon.tags.includes('bashing'))
    return 'B'
  else if (weapon.tags.includes('lethal'))
    return 'L'
  else if (weapon.tags.includes('aggravated'))
    return 'A'
  else
    return 'B'
}

export function weaponDefenseBonus(weapon) {
  switch(weapon.weight) {
  case 'light':
    return weapon.is_artifact ? 0 : 0
  case 'medium':
    return weapon.is_artifact ? 1 : 1
  case 'heavy':
    return weapon.is_artifact ? 0 : -1
  }
}

export function weaponDamage(character, weapon) {
  let damage = weaponDamageBonus(weapon)

  if (weapon.tags.includes('crossbow') || weapon.tags.includes('flame')) {
    damage += 4
  } else {
    damage += character.attr_strength
  }

  return damage
}

export function weaponOverwhelming(weapon) {
  if (! weapon.is_artifact)
    return 1
  switch(weapon.weight) {
  case 'light':
    return 3
  case 'medium':
    return 4
  case 'heavy':
    return 5
  }
}

function specialtiesForWeapon(character, weapon) {
  if (weapon.ability.startsWith('martial arts'))
    return specialtiesFor(character, 'martial_arts')
  else if (weapon.ability.startsWith('craft'))
    return specialtiesFor(character, 'craft')
  else
    return specialtiesFor(character, weapon.ability)
}

function excellencyForWeapon(character, weapon, charmAbils, stunt = false) {
  return maxExcellency(character, weapon.attr, weapon.ability, charmAbils, stunt)
}

export function witheringAttackPool(character, weapon, penalties, charmAbils) {
  const _attr = attr(character, weapon.attr)
  const _abil = abil(character, weapon.ability)
  const accuracy = weaponAccuracyBonus(weapon)
  const rawPool = _attr + _abil + accuracy

  const excellency = excellencyForWeapon(character, weapon, charmAbils)
  const excellencyStunt = excellencyForWeapon(character, weapon, charmAbils, true)

  return {
    name: weapon.name + ' Withering Attack',
    attribute: weapon.attr,
    attributeRating: _attr,
    ability: weapon.ability,
    abilityRating: _abil,
    accuracy: accuracy,
    raw: rawPool,
    specialties: specialtiesForWeapon(character, weapon),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: [{ label: 'Wound', penalty: penalties.wound }],
    total: Math.max(rawPool - penalties.wound, 0),
  }
}

export function rangedWitheringAttackPool(character, weapon, penalties, charmAbils) {
  if (!weaponIsRanged(weapon))
    return false

  const tag = rangeTag(weapon) || ''
  const range = rangeValue(weapon)
  const rangebonus = tag.toLowerCase().startsWith('thrown') ? thrownAccuracyBonus : archeryAccuracyBonus

  const _attr = attr(character, weapon.attr)
  const _abil = abil(character, weapon.ability)
  const rawPool = _attr + _abil

  const excellency = excellencyForWeapon(character, weapon, charmAbils)
  const excellencyStunt = excellencyForWeapon(character, weapon, charmAbils, true)

  const penalty = penalties.wound
  const poolBase = {
    attribute: weapon.attr,
    attributeRating: _attr,
    ability: weapon.ability,
    abilityRating: _abil,
    specialties: specialtiesForWeapon(character, weapon),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: [{ label: 'Wound', penalty: penalties.wound }],
  }

  return {
    close: { ...poolBase,
      name: weapon.name + ' Close Range Withering Attack',
      raw: rawPool + rangebonus(weapon, 'close'),
      total: Math.max(rawPool + rangebonus(weapon, 'close') - penalty, 0),
      available: true,
    },
    short: { ...poolBase,
      name: weapon.name + ' Short Range Withering Attack',
      raw: rawPool + rangebonus(weapon, 'short'),
      total: Math.max(rawPool + rangebonus(weapon, 'short') - penalty, 0),
      available: range >= 1,
    },
    medium: { ...poolBase,
      name: weapon.name + ' Medium Range Withering Attack',
      raw: rawPool + rangebonus(weapon, 'medium'),
      total: Math.max(rawPool + rangebonus(weapon, 'medium') - penalty, 0),
      available: range >= 2,
    },
    long: { ...poolBase,
      name: weapon.name + ' Long Range Withering Attack',
      raw: rawPool + rangebonus(weapon, 'long'),
      total: Math.max(rawPool + rangebonus(weapon, 'long') - penalty, 0),
      available: range >= 3,
    },
    extreme: { ...poolBase,
      name: weapon.name + ' Extreme Range Withering Attack',
      raw: rawPool + rangebonus(weapon, 'extreme'),
      total: Math.max(rawPool + rangebonus(weapon, 'extreme') - penalty, 0),
      available: range >= 4,
    },
  }
}

export function witheringDamage(character, weapon) {
  let _attr = weapon.damage_attr
  let attrRating = attr(character, weapon.damage_attr)

  if (weapon.tags.some((t) => t.toLowerCase() === 'flame')) {
    _attr = 'flame'
    attrRating = 4
  } else if (weapon.tags.some((t) => t.toLowerCase() === 'crossbow')) {
    _attr = 'crossbow'
    attrRating = 4
  }
  return {
    name: weapon.name + ' Withering Damage',
    attribute: _attr,
    attributeRating: attrRating,
    weaponDamage: weaponDamageBonus(weapon),
    total: weaponDamage(character, weapon),
    minimum: weaponOverwhelming(weapon),
    witheringDamage: true,
  }
}

export function decisiveAttackPool(character, weapon, penalties, charmAbils) {
  const _attr = attr(character, weapon.attr)
  const _abil = abil(character, weapon.ability)
  const rawPool = _attr + _abil

  const excellency = excellencyForWeapon(character, weapon, charmAbils)
  const excellencyStunt = excellencyForWeapon(character, weapon, charmAbils, true)

  return {
    name: weapon.name + ' Decisive Attack',
    attribute: weapon.attr,
    attributeRating: _attr,
    ability: weapon.ability,
    abilityRating: _abil,
    raw: rawPool,
    specialties: specialtiesForWeapon(character, weapon),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: [{ label: 'Wound', penalty: penalties.wound }],
    total: Math.max(rawPool - penalties.wound, 0),
  }
}

export function parry(character, weapon, penalties, charmAbils) {
  if (weaponIsRanged(weapon))
    return { raw: 0, total: 0 }

  const _attr = attr(character, weapon.attr)
  const _abil = abil(character, weapon.ability)
  const rawPool = _attr + _abil
  const specialties = specialtiesForWeapon(character, weapon)
  const penalty = penalties.onslaught + penalties.wound
  const rawRating = Math.ceil(rawPool / 2) + weaponDefenseBonus(weapon)
  const excellency = Math.floor(excellencyForWeapon(character, weapon, charmAbils) / 2)
  const excellencyStunt = Math.floor(excellencyForWeapon(character, weapon, charmAbils, true) / 2)

  return {
    name: weapon.name + ' Parry',
    attribute: weapon.attr,
    attributeRating: _attr,
    ability: weapon.ability,
    abilityRating: _abil,
    defense: weaponDefenseBonus(weapon),
    raw: rawRating,
    shield: weapon.tags.includes('shield') || weapon.tags.includes('Shield'),
    specialtyMatters: rawPool % 2 === 0 && specialties.length > 0,
    specialties: specialties,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalties: [{ label: 'Wound', penalty: penalties.wound }, { label: 'Onslaught', penalty: penalties.onslaught }],
    total: Math.max(rawRating - penalty, 0),
    rating: true,
    parry: true,
  }
}

export function weaponParry(character, weapon) {
  // TODO: handle archery and thrown
  // TODO: specialties
  return Math.ceil(attr(character, weapon.attr) + abil(character, weapon.ability) / 2) + weaponDefenseBonus(weapon)
}
