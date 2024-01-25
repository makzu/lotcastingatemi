import type { QcAttack } from '@/types'
import type { Battlegroup } from './types'

/* Battle Group rules are established in the Core book, p. 205 - 211 */

/** Attack pool for a Battle Group's attack with bonuses from Size and Might factored in */
export function bgAttackPool(battlegroup: Battlegroup, qc_attack: QcAttack) {
  return qc_attack.pool + battlegroup.size + battlegroup.might
}

/** Damage bonus for a Battle Group's attack with bonuses from Size and Might factored in */
export function bgDamage(battlegroup: Battlegroup, qc_attack: QcAttack) {
  return qc_attack.damage + battlegroup.size + battlegroup.might
}

/** Combined defense bonuses from Drill and might */
export function bgDefenseBonus(battlegroup: Battlegroup) {
  return battlegroup.drill + bgDefenseFromMight(battlegroup)
}

/** Might is defined on Core, p. 207 */
export function bgDefenseFromMight(battlegroup: Battlegroup) {
  let bonus = 0

  if (battlegroup.might > 0) bonus += 1
  if (battlegroup.might >= 3) bonus += 1

  return bonus
}

export function bgSoak(battlegroup: Battlegroup) {
  return battlegroup.soak + battlegroup.size
}

/** Drill is saved as a number in the backend */
export function prettyDrillRating(battlegroup: Battlegroup) {
  switch (battlegroup.drill) {
    case 0:
      return 'Poor'
    case 1:
      return 'Average'
    case 2:
      return 'Elite'
    default:
      return 'N/A'
  }
}

export function totalMagnitude(battlegroup: Battlegroup) {
  return (
    battlegroup.health_levels +
    battlegroup.size +
    (battlegroup.perfect_morale ? 3 : 0)
  )
}
