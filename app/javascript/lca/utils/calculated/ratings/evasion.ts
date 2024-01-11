import rating from './_rating'
import { penaltyObject } from '../index'
import { Character } from 'types'
import { PenaltyInput } from 'selectors'
import { PoolBonus } from 'utils/flow-types'

export function evasion(
  character: Character,
  _merits: string[],
  penalties: PenaltyInput,
  excellencyAbils: string[],
) {
  const bonfire = character.anima_level === 3
  let bonus = [] as PoolBonus[]

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
    penaltyObject(penalties, {
      useMobility: true,
      useOnslaught: true,
    }),
    excellencyAbils,
    bonus,
  )
}
export default evasion
