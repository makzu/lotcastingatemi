// @flow
import rating from './_rating.js'
import { penaltyObject } from '../index.js'
import type { Character } from 'utils/flow-types'

export function evasion(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  return rating(
    'Evasion',
    character,
    'dexterity',
    'dodge',
    penaltyObject(penalties, { useMobility: true, useOnslaught: true }),
    excellencyAbils
  )
}
export default evasion
