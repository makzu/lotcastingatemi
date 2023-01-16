export function clamp(val: number, min: number, max: number) {
  if (val > max) {
    if (max === 10 && val === 10) {
      // Willpower, essence can be exactly 10
      val = 10
    } else if (max <= 10) {
      val = Math.min(val % 10, max)
    } else {
      val = max
    }
  }

  if (val < min) {
    val = min
  }

  return val
}

/** Halves a number, rounded up. */
export const halfRoundUp = (val: number) => Math.ceil(val / 2)
/** Halves a number, rounded down. */
export const halfRoundDown = (val: number) => Math.floor(val / 2)
