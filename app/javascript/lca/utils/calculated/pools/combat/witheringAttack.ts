import type { Character, Weapon } from '@lca/types'
import type { BlockOfPenalties } from '@lca/types/pool'
import { weaponAccuracyBonus } from '../../weapons'
import decisiveAttack from './decisiveAttack'

export function witheringAttack(
  character: Character,
  weapon: Weapon,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
) {
  const pool = decisiveAttack(character, weapon, penalties, excellencyAbils)

  const accuracy = weaponAccuracyBonus(weapon) + weapon.bonus_accuracy
  const rawPool = pool.attributeRating + pool.abilityRating + accuracy

  return {
    ...pool,
    name: `${weapon.name} Withering Attack`,
    accuracy: accuracy,
    raw: Math.max(rawPool, 0),
    total: Math.max(rawPool - pool.totalPenalty, 0),
    attack: 'withering',
    damageType: undefined,
  }
}

export default witheringAttack
