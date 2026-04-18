export function clamp(val: number, min: number, max: number) {
  if (val > max) {
    return max
  }

  if (val < min) {
    return min
  }

  return val
}

export const halfRoundUp = (val: number) => Math.ceil(val / 2)
export const halfRoundDown = (val: number) => Math.floor(val / 2)
