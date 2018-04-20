// @flow
import pool from '../_pool.js'
import type { Character } from 'utils/flow-types'

export function disengage(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  let bonus = []
  if (merits.some(m => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  if (character.type !== 'Character' && character.caste === 'water')
    bonus = bonus.concat([
      { label: 'sx/3m anima', bonus: 1, situational: true },
    ])

  const penalty = [
    { label: 'wound', penalty: penalties.wound },
    { label: 'mobility', penalty: penalties.mobility },
  ]
  return pool(
    'Disengage',
    character,
    'dexterity',
    'dodge',
    bonus,
    penalty,
    excellencyAbils
  )
}
export const withdraw = disengage
export default disengage
