import { QC, QcMerit } from '@/types'

function qcExcellencyPoolCap(qc: QC, pool, stunt = false) {
  if (stunt && qc.excellency != 'lunar') return 0

  let caps
  let bonus = 0
  switch (qc.excellency) {
    case 'dragonblood':
      caps = [0, 2, 4, 6]
      break
    case 'lunar':
      caps = stunt ? [1, 4, 7, 10] : [1, 2, 4, 5]
      break
    case 'sidereal':
      return qc.essence
    case 'solar':
      caps = [2, 5, 7, 10]
      break
    case 'liminal':
      if (qc.anima_level > 1) bonus = qc.essence
      caps = [1 + bonus, 2 + bonus, 4 + bonus, 5 + bonus]
      break
    default:
      return 0
  }

  if (pool <= 2) return caps[0]
  else if (pool <= 6) return caps[1]
  else if (pool <= 10) return caps[2]
  else return caps[3]
}

function qcExcellencyRatingCap(qc: QC, rating, stunt = false) {
  if (stunt && qc.excellency != 'lunar') return 0

  let caps
  let bonus = 0
  switch (qc.excellency) {
    case 'dragonblood':
      caps = [0, 1, 2, 3]
      break
    case 'lunar':
      caps = stunt ? [1, 2, 4, 5] : [0, 1, 2, 2]
      break
    case 'sidereal':
      return qc.essence
    case 'solar':
      caps = [0, 1, 3, 5]
      break
    case 'liminal':
      if (qc.anima_level > 1) bonus = Math.floor(qc.essence / 2)
      caps = [0 + bonus, 1 + bonus, 2 + bonus, 2 + bonus]
      break
    default:
      return 0
  }

  if (rating <= 1) return caps[0]
  else if (rating <= 3) return caps[1]
  else if (rating <= 5) return caps[2]
  else return caps[3]
}

export function qcPool(
  qc: QC,
  pool: number,
  penalties = 0,
  merits: QcMerit[] = [],
  addExcellency = true,
) {
  const excellency = addExcellency ? qcExcellencyPoolCap(qc, pool) : 0
  const excellencyStunt = addExcellency
    ? qcExcellencyPoolCap(qc, pool, true)
    : 0
  return {
    raw: pool,
    bonus: merits,
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalty: penalties,
    total: Math.max(pool - penalties, 0),
  }
}

export function qcRating(
  qc: QC,
  rating: number,
  penalties = 0,
  merits: QcMerit[] = [],
  addExcellency = true,
) {
  const excellency = addExcellency ? qcExcellencyRatingCap(qc, rating) : 0
  const excellencyStunt = addExcellency
    ? qcExcellencyRatingCap(qc, rating, true)
    : 0
  return {
    raw: rating,
    bonus: merits,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalty: penalties,
    total: Math.max(rating - penalties, 0),
  }
}
