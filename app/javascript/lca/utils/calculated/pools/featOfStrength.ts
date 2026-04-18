import pool from './_pool'
import { penaltyObject } from '../index'
import type { Character } from 'types'
import { BlockOfPenalties } from 'types/pool'

export function featOfStrength(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
) {
  const thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = []
  if (thew != undefined) {
    bonus = [{ label: 'mighty thew', bonus: parseInt(thew.substr(-1)) }]
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
