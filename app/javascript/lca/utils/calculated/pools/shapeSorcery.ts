import type { Character } from '@lca/types'
import type { BlockOfPenalties } from '@lca/types/pool'
import { penaltyObject } from '../index'
import pool from './_pool'

export function shapeSorcery(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))

  return pool(
    'Shape Sorcery',
    character,
    'intelligence',
    'occult',
    [],
    penaltyObject(penalties, { useWound: !vitalFocus }),
    excellencyAbils,
  )
}
export default shapeSorcery
