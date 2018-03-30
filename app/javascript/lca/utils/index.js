export function clamp(val, min, max) {
  if (val > max) {
    if (max === 10 && val === 10) // Willpower, essence can be exactly 10
      val = 10
    else if (max <= 10)
      val = val % 10
    else
      val = max
  }

  if (val < min)
    val = min

  return val
}
