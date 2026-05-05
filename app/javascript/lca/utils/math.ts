/**
 * Clamps a number between a minimum and maximum value, inclusive.
 * @param val The value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 * @throws Error if min is greater than max.
 */
export function clamp(val: number, min: number, max: number) {
  if (min > max) {
    throw new Error('min must be less than or equal to max')
  }

  if (val >= max) {
    return max
  }

  if (val <= min) {
    return min
  }

  return val
}

/** Halves a number, rounded up. */
export const halfRoundUp = (val: number) => Math.ceil(val / 2)
/** Halves a number, rounded down. */
export const halfRoundDown = (val: number) => Math.floor(val / 2)
