import type { Character } from '@lca/types'
import type { BlockOfPenalties } from '@lca/types/pool'
import { penaltyObject } from '../index'
import pool from './_pool'

export function featOfStrength(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
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
