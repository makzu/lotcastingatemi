import pool from '../_pool'
import { penaltyObject } from '../../index'
import { Character } from 'types'
export function riseFromProne(
  character: Character,
  merits: string[],
  penalties: Record<string, $TSFixMe>,
  excellencyAbils: string[],
) {
  // TODO: handle merits that affect rise from prone pool?
  return pool(
    'Rise from Prone',
    character,
    'dexterity',
    'dodge',
    [],
    penaltyObject(penalties, {
      useMobility: true,
    }),
    excellencyAbils,
  )
}
export default riseFromProne
