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

export function weaponAttributeRating(character, weapon) {
  return character[`attr_${ weapon.attr }`]
}

export function weaponAbilityRating(character, weapon) {
  let ability
  if (weapon.ability.startsWith('martial arts')) {
    ability = character.abil_martial_arts.find((art) => `martial arts (${art.style})` == weapon.ability)
    return ability != undefined ? ability.rating : 0
  } else if (weapon.ability.startsWith('craft')) {
    ability = character.abil_craft.find((craft) => `craft (${craft.craft})` == weapon.ability).rating
    return ability != undefined ? ability.rating : 0
  } else {
    return character[`abil_${ weapon.ability }`]
  }
}

export function witheringAttackPool(character, weapon) {
  // TODO specialties
  // TODO penalties
  return decisiveAttackPool(character, weapon) + weaponAccuracyBonus(weapon)
}

export function decisiveAttackPool(character, weapon) {
  // TODO specialties
  // TODO penalties
  const attribute = weaponAttributeRating(character, weapon)
  const ability = weaponAbilityRating(character, weapon)

  return attribute + ability
}

export function weaponParry(character, weapon) {
  // TODO handle archery and thrown
  // TODO specialties
  return Math.ceil(decisiveAttackPool(character, weapon) / 2) + weaponDefenseBonus(weapon)
}
