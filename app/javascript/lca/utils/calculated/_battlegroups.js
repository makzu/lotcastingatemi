// @flow
/* See Core, p. 205 - 211 */
import type { Battlegroup, QcAttack } from 'utils/flow-types'

export function bgAttackPool(battlegroup: Battlegroup, qc_attack: QcAttack) {
  return qc_attack.pool + battlegroup.size + battlegroup.might
}

export function bgDamage(battlegroup: Battlegroup, qc_attack: QcAttack) {
  return qc_attack.damage + battlegroup.size + battlegroup.might
}

export function bgDefenseBonus(battlegroup: Battlegroup) {
  let bonus = 0

  bonus += battlegroup.drill

  if (battlegroup.might > 0) bonus += 1
  if (battlegroup.might >= 3) bonus += 1

  return bonus
}

export function bgSoak(battlegroup: Battlegroup) {
  return battlegroup.soak + battlegroup.size
}

export function prettyDrillRating(battlegroup: Battlegroup) {
  switch (battlegroup.drill) {
    case 0:
      return 'Poor'
    case 1:
      return 'Average'
    case 2:
      return 'Elite'
  }
}

export function totalMagnitude(battlegroup: Battlegroup) {
  return (
    battlegroup.health_levels +
    battlegroup.size +
    (battlegroup.perfect_morale ? 3 : 0)
  )
}
