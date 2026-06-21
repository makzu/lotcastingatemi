import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../index.ts'
import pool from './_pool.ts'

export function shapeSorcery(
  character: Character,
  merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
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
