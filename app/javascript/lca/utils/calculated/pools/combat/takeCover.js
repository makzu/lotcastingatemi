// @flow
import pool from '../_pool.js'
import type { Character } from 'utils/flow-types'

export function takeCover(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  // TODO: handle merits that affect take cover pool?
  const penalty = [
    { label: 'wound', penalty: penalties.wound },
    { label: 'mobility', penalty: penalties.mobility },
  ]
  return pool(
    'Take Cover',
    character,
    'dexterity',
    'dodge',
    [],
    penalty,
    excellencyAbils
  )
}
export default takeCover
