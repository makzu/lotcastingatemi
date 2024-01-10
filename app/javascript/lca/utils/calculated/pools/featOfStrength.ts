import pool from './_pool'
import { penaltyObject } from '../index'
import { Character } from 'types'
import { PoolBonus } from 'utils/flow-types'

export function featOfStrength(
  character: Character,
  merits: string[],
  penalties: Record<string, $TSFixMe>,
  excellencyAbils: string[],
) {
  const thew = merits.find((m) => m.startsWith('mighty thew'))
  let bonus = [] as PoolBonus[]

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
