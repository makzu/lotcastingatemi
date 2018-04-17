// @flow
import pool from '../_pool.js'
import type { Character } from 'utils/flow-types'

export function rush(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  let bonus = []
  if (merits.some(m => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  const penalty = [
    { label: 'wound', penalty: penalties.wound },
    { label: 'mobility', penalty: penalties.mobility },
  ]
  return pool(
    'Rush',
    character,
    'dexterity',
    'athletics',
    bonus,
    penalty,
    excellencyAbils
  )
}
export default rush
