import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../index.ts'
import rating from './_rating.ts'

export function evasion(
  character: Character,
  _merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  const bonfire = character.anima_level === 3
  let bonus = []

  // Earth Aspect DBs gain +1 Defense vs Smashing and Grapple attacks at bonfire
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
  // Nadir Caste Infernals gain +1 Evasion at bonfire
  if (
    character.type !== 'Character' &&
    character.exalt_type === 'Infernal' &&
    (character.caste || '').toLowerCase() === 'nadir'
  ) {
    bonus = [
      ...bonus,
      {
        label: `${bonfire ? '' : '/5m '} (anima)`,
        bonus: 1,
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
    bonus,
  )
}
export default evasion
