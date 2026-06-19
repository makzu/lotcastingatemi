import type { Character } from '@lca/types'
import type { BlockOfPenalties, PoolBonus } from '@lca/types/pool'
import { penaltyObject } from '../index'
import pool from './_pool'

export function readIntentions(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
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
