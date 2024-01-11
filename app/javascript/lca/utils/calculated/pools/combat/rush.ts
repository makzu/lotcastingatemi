import pool from '../_pool'
import { penaltyObject } from '../../index'
import { Character } from 'types'
import { PoolBonus } from 'utils/flow-types'
import { PenaltyInput } from 'selectors'

export function rush(
  character: Character,
  merits: string[],
  penalties: PenaltyInput,
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
    penaltyObject(penalties, {
      useMobility: true,
    }),
    excellencyAbils,
  )
}
export default rush
