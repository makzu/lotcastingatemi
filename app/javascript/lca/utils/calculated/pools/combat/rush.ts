import type { Character, PoolBonus, penaltyObj } from '@/types'
import { penaltyObject } from '../../index'
import pool from '../_pool'

export function rush(
  character: Character,
  merits: string[],
  penalties: penaltyObj,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
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
