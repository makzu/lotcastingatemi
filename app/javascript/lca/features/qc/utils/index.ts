import type { QC } from '../types'

export function qcHasPainTolerance(qc: QC) {
  return qc.qc_merits.some((m) => m.name.toLowerCase() === 'pain tolerance')
}

export function qcWoundPenalty(qc: QC) {
  const totalDmg = qc.damage_bashing + qc.damage_lethal + qc.damage_aggravated
  const lvl0 = qc.health_level_0s
  const lvl1 = lvl0 + qc.health_level_1s
  const lvl2 = lvl1 + qc.health_level_2s
  const lvl4 = lvl2 + qc.health_level_4s
  const modifier = qcHasPainTolerance(qc) ? 1 : 0

  if (totalDmg <= lvl0) {
    return 0
  } else if (totalDmg <= lvl1) {
    return 1
  } else if (totalDmg <= lvl2) {
    return 2 - modifier
  } else if (totalDmg <= lvl4) {
    return 4 - modifier
  } else {
    return 4 - modifier
  }
}
