// @flow
import pool from '../_pool.js'
import type { Character, fullWeapon } from 'utils/flow-types'

export function decisiveAttack(
  character: Character,
  weapon: fullWeapon,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  return pool(
    weapon.name + ' Decisive Attack',
    character,
    weapon.attr,
    weapon.ability,
    [],
    [{ label: 'Wound', penalty: penalties.wound }],
    excellencyAbils
  )
}
export default decisiveAttack
