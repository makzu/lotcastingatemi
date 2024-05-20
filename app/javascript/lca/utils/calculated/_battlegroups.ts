/* See Core, p. 205 - 211 */
import type { Battlegroup as NewBattlegroup } from '@/features/battlegroup/types'
import type { Battlegroup as OldBattlegroup } from '@/types/battlegroup'
import type { QcAttack } from '@/types/qc'

type Battlegroup = OldBattlegroup | NewBattlegroup

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

export function bgJoinBattlePool(bg: Battlegroup) {
  return {
    raw: bg.join_battle,
    penalty: bg.onslaught,
    total: Math.max(bg.join_battle - bg.onslaught, 0),
  }
}
