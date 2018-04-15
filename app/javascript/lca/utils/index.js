// @flow
export function clamp(val: number, min: number, max: number): number {
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

export const sortOrderSort = (a: Object, b: Object) => a.sort_order - b.sort_order
export const chronicleSortOrderSort = (a: Object, b: Object) => a.chronicle_sort_order - b.chronicle_sort_order
