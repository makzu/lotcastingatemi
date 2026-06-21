import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../../index.ts'
import pool from '../_pool.ts'

export function riseFromProne(
  character: Character,
  _merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  // TODO: handle merits that affect rise from prone pool?
  return pool(
    'Rise from Prone',
    character,
    'dexterity',
    'dodge',
    [],
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}
export default riseFromProne
