
function qcExcellencyPoolCap(qc, pool, stunt = false) {
  if (stunt && qc.excellency != 'lunar')
    return 0

  let caps
  let bonus = 0
  switch (qc.excellency) {
  case 'dragonblood':
    caps = [0, 2, 4, 6]
    break
  case 'lunar':
    caps = stunt ? [1, 4, 7, 10] : [0, 2, 4, 5]
    break
  case 'sidereal':
    return qc.essence
  case 'solar':
    caps = [0, 1, 3, 5]
    break
  case 'liminal':
    if (qc.anima_level > 1)
      bonus = qc.essence
    caps = [1 + bonus, 2 + bonus, 4 + bonus, 5 + bonus]
    break
  default:
    return 0
  }

  if (pool <= 2)
    return caps[0]
  else if (pool <= 6)
    return caps[1]
  else if (pool <= 10)
    return caps[2]
  else
    return caps[3]
}

function qcExcellencyRatingCap(qc, rating, stunt = false) {
  if (stunt && qc.excellency != 'lunar')
    return 0

  let caps
  let bonus = 0
  switch (qc.excellency) {
  case 'dragonblood':
    caps = [0, 1, 2, 3]
    break
  case 'lunar':
    caps = stunt ? [1, 3, 4, 5] : [0, 2, 2, 2]
    break
  case 'sidereal':
    return qc.essence
  case 'solar':
    caps = [0, 1, 3, 5]
    break
  case 'liminal':
    if (qc.anima_level > 1)
      bonus = Math.floor(qc.essence / 2)
    caps = [0 + bonus, 1 + bonus, 2 + bonus, 2 + bonus]
    break
  default:
    return 0
  }

  if (rating <= 2)
    return caps[0]
  else if (rating <= 6)
    return caps[1]
  else if (rating <= 10)
    return caps[2]
  else
    return caps[3]
}

export function qcPool(qc, pool, merits = [], penalties = 0) {
  const excellency = qcExcellencyPoolCap(qc, pool)
  const excellencyStunt = qcExcellencyPoolCap(qc, pool, true)
  return {
    raw: pool,
    meritBonus: merits,
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalty: penalties,
    total: Math.max(pool - penalties, 0)
  }
}

export function qcRating(qc, rating, merits = [], penalties = 0) {
  const excellency = qcExcellencyRatingCap(qc, rating)
  const excellencyStunt = qcExcellencyRatingCap(qc, rating, true)
  return {
    raw: rating,
    meritBonus: merits,
    excellency: excellency,
    excellencyCost: excellency * 2,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt * 2,
    penalty: penalties,
    total: Math.max(rating - penalties, 0)
  }
}
