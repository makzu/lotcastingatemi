import pool from '../_pool'
import { penaltyObject } from '../../index'
import type { Character } from 'types'
import { BlockOfPenalties } from 'types/pool'

export function rush(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
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
