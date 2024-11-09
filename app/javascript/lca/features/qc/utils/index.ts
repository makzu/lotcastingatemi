import type { WithHealthLevels } from '@/types/shared'
import type { QC } from '../types'

export function qcHasPainTolerance(qc: QC) {
  return qc.qc_merits.some((m) => m.name.toLowerCase() === 'pain tolerance')
}

export function qcWoundPenalty(qc: QC) {
  return generalWoundPenalty(qc, qcHasPainTolerance(qc))
}

export function generalWoundPenalty(
  character: WithHealthLevels,
  painTolerance: boolean,
) {
  const totalDmg =
    character.damage_bashing +
    character.damage_lethal +
    character.damage_aggravated
  const lvl0 = character.health_level_0s
  const lvl1 = lvl0 + character.health_level_1s
  const lvl2 = lvl1 + character.health_level_2s
  const lvl4 = lvl2 + character.health_level_4s
  const modifier = painTolerance ? 1 : 0

  if (totalDmg <= lvl0) {
    return 0
  }
  if (totalDmg <= lvl1) {
    return 1
  }
  if (totalDmg <= lvl2) {
    return 2 - modifier
  }
  if (totalDmg <= lvl4) {
    return 4 - modifier
  }
  return 4 - modifier
}
