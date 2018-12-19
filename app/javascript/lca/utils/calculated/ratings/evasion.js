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
  const bonfire = character.anima_level === 3
  let bonus = []

  // Earth aspect DBs gain +1 Defense vs Smashing and Grapple attacks at bonfire
  if (
    character.type !== 'Character' &&
    (character.type === 'DragonbloodCharacter' ||
      (character.exalt_type || '').toLowerCase().startsWith('dragon')) &&
    (character.caste || '').toLowerCase() === 'earth'
  ) {
    bonus = [
      ...bonus,
      {
        label: `${bonfire ? '' : '/5m '} vs smash/grapple (anima)`,
        bonus: 1,
        situational: true,
      },
    ]
  }
  return rating(
    'Evasion',
    character,
    'dexterity',
    'dodge',
    penaltyObject(penalties, { useMobility: true, useOnslaught: true }),
    excellencyAbils,
    bonus
  )
}
export default evasion
