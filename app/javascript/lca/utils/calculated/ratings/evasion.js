// @flow
import rating from './_rating.js'
import type { Character } from 'utils/flow-types'

export function evasion(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  const pen = [
    { label: 'wound', penalty: penalties.wound },
    { label: 'mobility', penalty: penalties.mobility },
    { label: 'onslaught', penalty: penalties.onslaught },
  ]
  return rating(
    'Evasion',
    character,
    'dexterity',
    'dodge',
    pen,
    excellencyAbils
  )
}
export default evasion
