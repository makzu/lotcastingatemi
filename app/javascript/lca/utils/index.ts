export * from './math'
import { deepEqual } from 'fast-equals'

/** Returns a random item from an array. */
export const sample = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)]

/** Returns a string with the first letter capitalized and the other letters in
 * lowercase.
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)

const ARTICLES = ['a', 'an', 'and', 'at', 'by', 'from', 'of', 'the']

/** Capitalizes the first letter of most words in a string. Attempts to follow
 * common practices for capitalizing titles of things (e.g, 'of' and 'the' are
 * left lower-case unless they're the first or last word)
 */
export const titleCase = (str: string) =>
  str
    .split(' ')
    .map((s, i, array) =>
      ARTICLES.includes(s) && ![0, array.length - i].includes(i)
        ? s
        : capitalize(s),
    )
    .join(' ')

export function checkVisible(elm: HTMLElement | null) {
  if (elm == null) {
    return
  }
  const rect = elm.getBoundingClientRect()
  const viewHeight = Math.max(
    document.documentElement ? document.documentElement.clientHeight : 0,
    window.innerHeight,
  )
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

export interface Sortable {
  sort_order: number
}
export interface ChSortable {
  chronicle_sort_order: number
}
export const sortOrderSort = (a: Sortable, b: Sortable) =>
  a.sort_order - b.sort_order
export const chronicleSortOrderSort = (a: ChSortable, b: ChSortable) =>
  a.chronicle_sort_order - b.chronicle_sort_order

export const isUnequalByKeys = (obj1: object, obj2: object, keys: string[]) =>
  keys.some((key) => !deepEqual(obj1[key], obj2[key]))
