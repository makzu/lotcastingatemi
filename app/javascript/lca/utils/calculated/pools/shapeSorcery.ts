import pool from './_pool'
import { penaltyObject } from '../index'
import { Character } from 'types'
import { PenaltyInput } from 'selectors'

export function shapeSorcery(
  character: Character,
  merits: string[],
  penalties: PenaltyInput,
  excellencyAbils: string[],
) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))

  return pool(
    'Shape Sorcery',
    character,
    'intelligence',
    'occult',
    [],
    penaltyObject(penalties, {
      useWound: !vitalFocus,
    }),
    excellencyAbils,
  )
}
export default shapeSorcery
