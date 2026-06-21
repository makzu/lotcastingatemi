import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties, PoolBonus } from '@lca/types/pool.ts'
import { penaltyObject } from '../index.ts'
import pool from './_pool.ts'

export function readIntentions(
  character: Character,
  merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  let bonus: PoolBonus[] = []
  if (merits.some((m) => m.startsWith('danger sense')))
    bonus = [{ label: 'danger sense', bonus: 1, situational: true }]

  return pool(
    'Read Intentions',
    character,
    'perception',
    'socialize',
    bonus,
    penaltyObject(penalties),
    excellencyAbils,
  )
}
export default readIntentions
