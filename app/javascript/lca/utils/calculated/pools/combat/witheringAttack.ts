import decisiveAttack from './decisiveAttack'
import { weaponAccuracyBonus } from '../../weapons'
import type { Character, fullWeapon } from 'utils/flow-types'
import { PenaltyInput } from 'selectors'

export function witheringAttack(
  character: Character,
  weapon: fullWeapon,
  penalties: PenaltyInput,
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
