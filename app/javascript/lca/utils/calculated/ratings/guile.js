// @flow

import rating from './_rating.js'
import { penaltyObject } from '../index.js'
import type { Character } from 'utils/flow-types'

export function guile(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  return rating(
    'Guile',
    character,
    'manipulation',
    'socialize',
    penaltyObject(penalties),
    excellencyAbils
  )
}
export default guile
