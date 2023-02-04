// @flow
import pool from '../_pool.js'
import { penaltyObject } from '../../index.js'
import type { Character } from 'utils/flow-types'

export function rush(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>,
) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]

  return pool(
    'Rush',
    character,
    'dexterity',
    'athletics',
    bonus,
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}
export default rush
