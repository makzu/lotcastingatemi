import pool from '../_pool'
import { penaltyObject } from '../../index'
import type { Character } from 'types'
import { BlockOfPenalties } from 'types/pool'

export function takeCover(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
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
