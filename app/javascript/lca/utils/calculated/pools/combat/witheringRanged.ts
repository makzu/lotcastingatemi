import type { Character, Weapon, penaltyObj } from '@/types'
import {
  archeryAccuracyBonus,
  rangeTag,
  rangeValue,
  thrownAccuracyBonus,
  weaponIsRanged,
} from '../../weapons'
import decisiveAttack from './decisiveAttack'

export function rangedWitheringAttackPool(
  character: Character,
  weapon: Weapon,
  penalties: penaltyObj,
  excellencyAbils: string[],
) {
  if (!weaponIsRanged(weapon)) return false

  const tag = rangeTag(weapon) ?? ''
  const range = rangeValue(weapon)
  const rangebonus = tag.startsWith('thrown')
    ? thrownAccuracyBonus(weapon)
    : archeryAccuracyBonus(weapon)

  const poolBase = {
    ...decisiveAttack(character, weapon, penalties, excellencyAbils),
    attack: 'withering',
    damageType: undefined,
  }
  const rawPool = (poolBase.raw ?? 0) + weapon.bonus_accuracy

  const penalty = poolBase.totalPenalty ?? 0

  return {
    close: {
      ...poolBase,
      name: weapon.name + ' Close Range Withering Attack',
      raw: rawPool + rangebonus.close,
      accuracy: rangebonus.close,
      total: Math.max(rawPool + rangebonus.close - penalty, 0),
      available: true,
    },
    short: {
      ...poolBase,
      name: weapon.name + ' Short Range Withering Attack',
      raw: rawPool + rangebonus.short,
      accuracy: rangebonus.short,
      total: Math.max(rawPool + rangebonus.short - penalty, 0),
      available: range >= 1,
    },
    medium: {
      ...poolBase,
      name: weapon.name + ' Medium Range Withering Attack',
      raw: rawPool + rangebonus.medium,
      accuracy: rangebonus.medium,
      total: Math.max(rawPool + rangebonus.medium - penalty, 0),
      available: range >= 2,
    },
    long: {
      ...poolBase,
      name: weapon.name + ' Long Range Withering Attack',
      raw: rawPool + rangebonus.long,
      accuracy: rangebonus.long,
      total: Math.max(rawPool + rangebonus.long - penalty, 0),
      available: range >= 3,
    },
    extreme: {
      ...poolBase,
      name: weapon.name + ' Extreme Range Withering Attack',
      raw: rawPool + rangebonus.extreme,
      accuracy: rangebonus.extreme,
      total: Math.max(rawPool + rangebonus.extreme - penalty, 0),
      available: range >= 4,
    },
  }
}
