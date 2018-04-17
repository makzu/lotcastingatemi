// @flow
import pool from '../_pool.js'
import type { Character } from 'utils/flow-types'

export function riseFromProne(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  // TODO: handle merits that affect rise from prone pool?
  const penalty = [
    { label: 'wound', penalty: penalties.wound },
    { label: 'mobility', penalty: penalties.mobility },
  ]
  return pool(
    'Rise from Prone',
    character,
    'dexterity',
    'dodge',
    [],
    penalty,
    excellencyAbils
  )
}
export default riseFromProne
