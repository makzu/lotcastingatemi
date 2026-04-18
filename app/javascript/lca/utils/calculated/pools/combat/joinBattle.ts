import pool from '../_pool'
import { penaltyObject } from '../../index'
import type { Character } from 'types'
import { BlockOfPenalties } from 'types/pool'

export function joinBattle(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fast reflexes')))
    bonus = [{ label: 'fast reflexes', bonus: 1 }]

  return pool(
    'Join Battle',
    character,
    'wits',
    'awareness',
    bonus,
    penaltyObject(penalties),
    excellencyAbils,
  )
}
export default joinBattle
