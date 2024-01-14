import type { Character, PoolBonus, penaltyObj } from '@/types'
import { penaltyObject } from '../index'
import pool from './_pool'

export function featOfStrength(
  character: Character,
  merits: string[],
  penalties: penaltyObj,
  excellencyAbils: string[],
) {
  const thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = [] as PoolBonus[]
  if (thew != undefined) {
    bonus = [{ label: 'mighty thew', bonus: parseInt(thew.slice(-1)) }]
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
