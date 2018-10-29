// @flow
import pool from './_pool.js'
import { penaltyObject } from '../index.js'
import type { Character } from 'utils/flow-types'

export function shapeSorcery(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  const vitalFocus = merits.some(m => m.startsWith('vital focus cultivation'))

  return pool(
    'Shape Sorcery',
    character,
    'intelligence',
    'occult',
    [],
    penaltyObject(penalties, { useWound: !vitalFocus }),
    excellencyAbils
  )
}
export default shapeSorcery
