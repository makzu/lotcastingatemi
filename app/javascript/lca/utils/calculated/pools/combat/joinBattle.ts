import { Character } from 'types'
import { PoolBonus } from 'utils/flow-types'
import { penaltyObject } from '../../index'
import pool from '../_pool'
import { PenaltyInput } from 'selectors'

export function joinBattle(
  character: Character,
  merits: string[],
  penalties: PenaltyInput,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  if (merits.some((m) => m.startsWith('fast reflexes')))
    bonus = [
      {
        label: 'fast reflexes',
        bonus: 1,
      },
    ]
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
