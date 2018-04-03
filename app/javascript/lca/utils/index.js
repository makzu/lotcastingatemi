export function clamp(val, min, max) {
  if (val > max) {
    if (max === 10 && val === 10) // Willpower, essence can be exactly 10
      val = 10
    else if (max <= 10)
      val = Math.min(val % 10, max)
    else
      val = max
  }

  if (val < min)
    val = min

  return val
}

export const sortOrderSort = array => array.sort((a, b) => a.sort_order - b.sort_order)
