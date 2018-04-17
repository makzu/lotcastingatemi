// @flow
import rating from './_rating.js'
import { weaponIsRanged } from '../_weapons.js'
import type { Character, fullWeapon } from 'utils/flow-types'

export function weaponDefenseBonus(weapon: fullWeapon) {
  switch (weapon.weight) {
    case 'light':
      return weapon.is_artifact ? 0 : 0
    case 'medium':
      return weapon.is_artifact ? 1 : 1
    case 'heavy':
      return weapon.is_artifact ? 0 : -1
  }
}

export function parry(
  character: Character,
  weapon: fullWeapon,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  if (weaponIsRanged(weapon)) return { raw: 0, total: 0 }

  const penalty = penalties.onslaught + penalties.wound

  const rat = rating(
    weapon.name + ' Parry',
    character,
    weapon.attr,
    weapon.ability,
    [
      { label: 'Wound', penalty: penalties.wound },
      { label: 'Onslaught', penalty: penalties.onslaught },
    ],
    excellencyAbils,
    []
  )
  const rawRating =
    Math.ceil((rat.attributeRating + rat.abilityRating) / 2) +
    weaponDefenseBonus(weapon)
  return {
    ...rat,
    defense: weaponDefenseBonus(weapon),
    raw: rawRating,
    shield: weapon.tags.includes('shield') || weapon.tags.includes('Shield'),
    total: Math.max(rawRating - penalty, 0),
    parry: true,
  }
}
export default parry
