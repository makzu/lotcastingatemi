import type { Character, Weapon, penaltyObj } from '@/types'
import { weaponAccuracyBonus } from '../../index'
import decisiveAttack from './decisiveAttack'

export function witheringAttack(
  character: Character,
  weapon: Weapon,
  penalties: penaltyObj,
  excellencyAbils: string[],
) {
  const pool = decisiveAttack(character, weapon, penalties, excellencyAbils)
  const accuracy = weaponAccuracyBonus(weapon) + weapon.bonus_accuracy
  const rawPool =
    (pool.attributeRating ?? 0) + (pool.abilityRating ?? 0) + accuracy

  return {
    ...pool,
    name: weapon.name + ' Withering Attack',
    accuracy: accuracy,
    raw: Math.max(rawPool, 0),
    total: Math.max(rawPool - (pool.totalPenalty ?? 0), 0),
    attack: 'withering',
    damageType: undefined,
  }
}
export default witheringAttack
