import type { Character } from '@lca/types'
import type { BlockOfPenalties } from '@lca/types/pool'
import { penaltyObject } from '../../index'
import pool from '../_pool'

export function riseFromProne(
  character: Character,
  _merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
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
