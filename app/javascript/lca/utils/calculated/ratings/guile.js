// @flow
import type { Character } from 'utils/flow-types'
import rating from './_rating.js'

export function guile(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  const pen = [{ label: 'Wound', penalty: penalties.wound }]
  return rating(
    'Guile',
    character,
    'manipulation',
    'socialize',
    pen,
    excellencyAbils
  )
}
export default guile
