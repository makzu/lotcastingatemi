// @flow
export * from './math'
import { deepEqual } from 'fast-equals'

export const sample = (array: Array<any>) =>
  array[Math.floor(Math.random() * array.length)]

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)

const ARTICLES = ['a', 'an', 'and', 'at', 'by', 'from', 'of', 'the']

export const titleCase = (string: string) =>
  string
    .split(' ')
    .map((s, i, array) =>
      ARTICLES.includes(s) && ![0, array.length - i].includes(i)
        ? s
        : capitalize(s)
    )
    .join(' ')

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

export const isUnequalByKeys = (
  obj1: Object,
  obj2: Object,
  keys: Array<string>
) => keys.some(key => !deepEqual(obj1[key], obj2[key]))
