// @flow
import decisiveAttack from './decisiveAttack.js'
import { weaponAccuracyBonus } from '../../weapons'
import type { Character, fullWeapon } from 'utils/flow-types'

export function witheringAttack(
  character: Character,
  weapon: fullWeapon,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  const pool = decisiveAttack(character, weapon, penalties, excellencyAbils)

  const accuracy = weaponAccuracyBonus(weapon)
  const rawPool = pool.attributeRating + pool.abilityRating + accuracy

  return {
    ...pool,
    name: weapon.name + ' Withering Attack',
    accuracy: accuracy,
    raw: rawPool,
    total: Math.max(rawPool - penalties.wound, 0),
    attack: 'withering',
    damageType: undefined,
  }
}

export default witheringAttack
