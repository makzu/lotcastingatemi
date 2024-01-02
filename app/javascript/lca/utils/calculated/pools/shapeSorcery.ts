import { Character, penaltyObj } from '@/types'
import { penaltyObject } from '../index'
import pool from './_pool'

export function shapeSorcery(
  character: Character,
  merits: string[],
  penalties: penaltyObj,
  excellencyAbils: string[],
) {
  const vitalFocus = merits.some((m) => m.startsWith('vital focus cultivation'))

  return pool(
    'Shape Sorcery',
    character,
    'intelligence',
    'occult',
    [],
    penaltyObject(penalties, { useWound: !vitalFocus }),
    excellencyAbils,
  )
}
export default shapeSorcery
