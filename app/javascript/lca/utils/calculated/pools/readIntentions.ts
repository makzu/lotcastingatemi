import pool from './_pool'
import { penaltyObject } from '../index'
import { Character } from 'types'
import { PoolBonus } from 'utils/flow-types'
import { PenaltyInput } from 'selectors'

export function readIntentions(
  character: Character,
  merits: string[],
  penalties: PenaltyInput,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  if (merits.some((m) => m.startsWith('danger sense')))
    bonus = [
      {
        label: 'danger sense',
        bonus: 1,
        situational: true,
      },
    ]
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
