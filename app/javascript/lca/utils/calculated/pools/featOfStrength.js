// @flow
import pool from './_pool.js'
import { penaltyObject } from '../index.js'
import type { Character } from 'utils/flow-types'

export function featOfStrength(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  let thew = merits.find(m => m.startsWith('mighty thew'))
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
    excellencyAbils
  )
}
export default featOfStrength
