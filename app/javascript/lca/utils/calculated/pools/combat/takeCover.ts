import pool from '../_pool'
import { penaltyObject } from '../../index'
import { Character } from 'types'

export function takeCover(
  character: Character,
  merits: string[],
  penalties: Record<string, $TSFixMe>,
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
