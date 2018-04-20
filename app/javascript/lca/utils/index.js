// @flow
export function clamp(val: number, min: number, max: number): number {
  if (val > max) {
    if (max === 10 && val === 10)
      // Willpower, essence can be exactly 10
      val = 10
    else if (max <= 10) val = Math.min(val % 10, max)
    else val = max
  }

  if (val < min) val = min

  return val
}

export function checkVisible(elm: Object | null) {
  if (elm == null) return
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(
    document.documentElement ? document.documentElement.clientHeight : 0,
    window.innerHeight
  )
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

type Sortable = {
  sort_order: number,
}
type ChSortable = {
  chronicle_sort_order: number,
}
export const sortOrderSort = (a: Sortable, b: Sortable) =>
  a.sort_order - b.sort_order
export const chronicleSortOrderSort = (a: ChSortable, b: ChSortable) =>
  a.chronicle_sort_order - b.chronicle_sort_order
