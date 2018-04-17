// @flow
import pool from './_pool.js'
import type { Character } from 'utils/flow-types'

export function shapeSorcery(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  const vitalFocus = merits.some(m => m.startsWith('vital focus cultivation'))
  const penalty = vitalFocus
    ? []
    : [{ label: 'wound', penalty: penalties.wound }]
  return pool(
    'Shape Sorcery',
    character,
    'intelligence',
    'occult',
    [],
    penalty,
    excellencyAbils
  )
}
export default shapeSorcery
