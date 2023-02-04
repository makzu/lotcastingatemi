// @flow
import pool from '../_pool.js'
import { penaltyObject } from '../../index.js'
import type { Character } from 'utils/flow-types'

export function riseFromProne(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>,
) {
  // TODO: handle merits that affect rise from prone pool?
  return pool(
    'Rise from Prone',
    character,
    'dexterity',
    'dodge',
    [],
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}
export default riseFromProne
