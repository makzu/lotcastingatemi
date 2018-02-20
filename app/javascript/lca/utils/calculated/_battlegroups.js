/* See Core, p. 205 - 211 */

export function bgAttackPool(battlegroup, qc_attack) {
  return qc_attack.pool + battlegroup.size + battlegroup.might
}

export function bgDamage(battlegroup, qc_attack) {
  return qc_attack.damage + battlegroup.size + battlegroup.might
}

export function bgDefenseBonus(battlegroup) {
  let bonus = 0

  bonus += battlegroup.drill

  if (battlegroup.might > 0)
    bonus += 1
  if (battlegroup.might >= 3)
    bonus += 1

  return bonus
}

export function bgSoak(battlegroup) {
  return battlegroup.soak + battlegroup.size
}

export function prettyDrillRating(battlegroup) {
  switch(battlegroup.drill) {
  case 0:
    return 'Poor'
  case 1:
    return 'Average'
  case 2:
    return 'Elite'
  }
}
