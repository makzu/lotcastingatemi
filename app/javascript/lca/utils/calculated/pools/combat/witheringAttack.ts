import decisiveAttack from './decisiveAttack'
import { weaponAccuracyBonus } from '../../weapons'
import type { Character, Weapon } from 'types'
import {} from '../_pool'
import { BlockOfPenalties } from 'types/pool'

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
    name: weapon.name + ' Withering Attack',
    accuracy: accuracy,
    raw: Math.max(rawPool, 0),
    total: Math.max(rawPool - pool.totalPenalty, 0),
    attack: 'withering',
    damageType: undefined,
  }
}

export default witheringAttack
