import { attackAbilities } from './index.js'

export function weaponAccuracyBonus(weapon) {
  // TODO: thrown/archery
  switch(weapon.weight) {
  case 'light':
    return weapon.is_artifact ? 5 : 4
  case 'medium':
    return weapon.is_artifact ? 3 : 2
  case 'heavy':
    return weapon.is_artifact ? 1 : 0
  }
}

export function weaponDamageBonus(weapon) {
  // TODO: thrown/archery
  let damage = 0

  switch(weapon.weight) {
  case 'light':
    damage = weapon.is_artifact ? 10 : 7
    break
  case 'medium':
    damage = weapon.is_artifact ? 12 : 9
    break
  case 'heavy':
    damage = weapon.is_artifact ? 14 : 11
    break
  }

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

export function witheringAttackPool(character, weapon) {
  // TODO specialties
  // TODO penalties
  return decisiveAttackPool(character, weapon) + weaponAccuracyBonus(weapon)
}

export function decisiveAttackPool(character, weapon) {
  // TODO specialties
  // TODO penalties
  const ability = attackAbilities(character).find((abil) =>
    abil.abil == weapon.ability
  )
  if (ability == undefined)
    return character.attr_dexterity

  return character.attr_dexterity + ability.rating
}

export function weaponParry(character, weapon) {
  // TODO handle archery and thrown
  // TODO specialties
  return Math.ceil(decisiveAttackPool(character, weapon) / 2) + weaponDefenseBonus(weapon)
}
