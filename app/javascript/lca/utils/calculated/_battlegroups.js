import { totalHealthLevels } from '.'

/* See Core, p. 205 - 211 */

export function bgAttackPool(battlegroup, qc_attack) {
  return qc_attack.pool + battlegroup.size + battlegroup.might
}

export function bgDamage(battlegroup, qc_attack) {
  return qc_attack.damage + battlegroup.size + battlegroup.might
}

export function bgDefense(battlegroup, qc) {
  let bonus = 0

  bonus += battlegroup.drill

  if (battlegroup.might > 0)
    bonus += 1
  if (battlegroup.might >= 3)
    bonus += 1

  return Math.max(qc.parry, qc.evasion) + bonus
}

export function bgSoak(battlegroup, qc) {
  return qc.soak + battlegroup.size
}

export function bgMagnitudeTotal(battlegroup, qc) {
  return totalHealthLevels(qc) + battlegroup.size +
    (battlegroup.perfect_morale ? 0 : 3)
}
