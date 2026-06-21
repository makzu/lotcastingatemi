import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../../index.ts'
import pool from '../_pool.ts'

export function takeCover(
  character: Character,
  _merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  // TODO: handle merits that affect take cover pool?
  return pool(
    'Take Cover',
    character,
    'dexterity',
    'dodge',
    [],
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}
export default takeCover
