// @flow
import pool from '../_pool.js'
import { penaltyObject } from '../../index.js'
import type { Character } from 'utils/flow-types'

export function joinBattle(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  let bonus = []
  if (merits.some(m => m.startsWith('fast reflexes')))
    bonus = [{ label: 'fast reflexes', bonus: 1 }]

  return pool(
    'Join Battle',
    character,
    'wits',
    'awareness',
    bonus,
    penaltyObject(penalties),
    excellencyAbils
  )
}
export default joinBattle
