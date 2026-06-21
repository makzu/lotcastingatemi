import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../index.ts'
import pool from './_pool.ts'

export function featOfStrength(
  character: Character,
  merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  const thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = []
  if (thew != null) {
    bonus = [{ label: 'mighty thew', bonus: parseInt(thew.slice(-1), 10) }]
  }
  return pool(
    'Feat of Strength',
    character,
    'strength',
    'athletics',
    bonus,
    penaltyObject(penalties),
    excellencyAbils,
  )
}
export default featOfStrength
