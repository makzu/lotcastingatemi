// @flow
import pool from './_pool.js'
import type { Character } from 'utils/flow-types'

export function readIntentions(
  character: Character,
  merits: Array<string>,
  penalties: Object,
  excellencyAbils: Array<string>
) {
  let bonus = []
  if (merits.some(m => m.startsWith('danger sense')))
    bonus = [{ label: 'danger sense', bonus: 1, situational: true }]
  const penalty = [{ label: 'wound', penalty: penalties.wound }]
  return pool(
    'Read Intentions',
    character,
    'perception',
    'socialize',
    bonus,
    penalty,
    excellencyAbils
  )
}
export default readIntentions
