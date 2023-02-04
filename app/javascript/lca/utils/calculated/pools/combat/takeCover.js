// @flow
import pool from '../_pool.js'
import { penaltyObject } from '../../index.js'
import type { Character } from 'utils/flow-types'

export function takeCover(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>,
) {
  // TODO: handle merits that affect take cover pool?
  return pool(
    'Take Cover',
    character,
    'dexterity',
    'dodge',
    [],
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}
export default takeCover
