import pool from '../_pool'
import { penaltyObject } from '../../index'
import type { Character } from 'types'
import { BlockOfPenalties } from 'types/pool'

export function riseFromProne(
  character: Character,
  merits: Array<string>,
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
