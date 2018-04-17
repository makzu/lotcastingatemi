// @flow
import pool from './_pool.js'
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
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool(
    'Feat of Strength',
    character,
    'strength',
    'athletics',
    bonus,
    penalty,
    excellencyAbils
  )
}
export default featOfStrength
