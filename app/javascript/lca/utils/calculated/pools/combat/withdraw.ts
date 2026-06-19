import type { Character } from '@lca/types'
import type { BlockOfPenalties } from '@lca/types/pool'
import { penaltyObject } from '../../index.js'
import pool from '../_pool'

/** Withdraw pool, described in the core book, page 199 */
export function withdraw(
  character: Character,
  merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  if (character.type !== 'Character' && character.caste === 'water')
    bonus = bonus.concat([
      { label: 'sux/3m anima', bonus: 1, situational: true },
    ])

  return pool(
    'Withdraw',
    character,
    'dexterity',
    'athletics',
    bonus,
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}

export default withdraw
