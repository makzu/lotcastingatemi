import pool from '../_pool.js'
import { penaltyObject } from '../../index.js'
import type { Character } from 'types'
import { PoolBonus } from 'utils/flow-types/pool'

/** Withdraw pool, described in the core book, page 199 */
export function withdraw(
  character: Character,
  merits: string[],
  // TODO: replace this any with a real type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  penalties: any,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  if (character.type !== 'Character' && character.caste === 'water')
    bonus = bonus.concat([
      { label: 'sux/3m anima', bonus: 1, situational: true },
    ])

  return pool(
    'Disengage',
    character,
    'dexterity',
    'athletics',
    bonus,
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}

export default withdraw
