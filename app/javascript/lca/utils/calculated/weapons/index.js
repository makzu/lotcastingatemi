// @flow
export * from './overwhelming.js'

import type { fullWeapon } from 'utils/flow-types'

// Mortal melee/ma weapons: p.580
// Mortal thrown weapons:   p.587
// Mortal archery weapons:  p.588

export function weaponAccuracyBonus(weapon: fullWeapon) {
  switch (weapon.weight) {
    case 'light':
      return weapon.is_artifact ? 5 : 4
    case 'medium':
      return weapon.is_artifact ? 3 : 2
    case 'heavy':
      return weapon.is_artifact ? 1 : 0
  }
}

export function archeryAccuracyBonus(weapon: fullWeapon) {
  // close -2, short +4, medium +2, long +0, extreme -2
  // close -1, short +5, medium +3, long +1, extreme -1
  const bonus = weapon.is_artifact ? 1 : 0
  return {
    close: (weapon.tags.includes('flame') ? 0 : -1) + bonus,
    short: 4 + bonus,
    medium: 2 + bonus,
    long: 0 + bonus,
    extreme: -2 + bonus,
  }
}

export function thrownAccuracyBonus(weapon: fullWeapon) {
  // regular  close +4, short +3, medium +2, long -1, extreme -3
  // artifact close +5, short +4, medium +3, long +0, extreme -2
  const bonus = weapon.is_artifact ? 1 : 0
  return {
    close: 4 + bonus,
    short: 3 + bonus,
    medium: 2 + bonus,
    long: -1 + bonus,
    extreme: -3 + bonus,
  }
}

export const rangeTag = weapon =>
  weapon.tags.find(t => t.startsWith('thrown') || t.startsWith('archery')) ||
  (weapon.tags.includes('elemental bolt') ? 'thrown (medium)' : undefined)

export const rangeValue = weapon => {
  const tag = rangeTag(weapon)
  if (tag == undefined) return 0

  const rangeRegex = /\(([^)]+)\)/.exec(tag)
  let range
  if (rangeRegex != null) range = rangeRegex[1]
  switch (range) {
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

export function weaponIsRanged(weapon: fullWeapon) {
  const tag = rangeTag(weapon)
  if (['archery', 'thrown'].includes(weapon.ability)) return true

  if (['melee', 'brawl'].includes(weapon.ability)) return false

  if (tag != undefined) return true

  return false
}
