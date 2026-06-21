import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../../index.ts'
import pool from '../_pool.ts'

export function rush(
  character: Character,
  merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]

  return pool(
    'Rush',
    character,
    'dexterity',
    'athletics',
    bonus,
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}
export default rush
