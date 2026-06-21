import type { Character } from '@lca/types/index.ts'
import type { BlockOfPenalties } from '@lca/types/pool.ts'
import { penaltyObject } from '../index.ts'
import rating from './_rating.ts'

export function guile(
  character: Character,
  merits: string[],
  penalties: BlockOfPenalties,
  excellencyAbils: string[],
) {
  let bonus = []
  const wellBred = merits.find((m) => m.startsWith('inhuman visage'))
  if (wellBred !== undefined)
    bonus = bonus.concat([{ label: 'inhuman visage', bonus: 1 }])

  if (
    (character.caste || '').toLowerCase() === 'changing moon' &&
    character.anima_level === 0
  ) {
    bonus = bonus.concat([{ label: 'changing moon anima', bonus: 1 }])
  }

  return rating(
    'Guile',
    character,
    'manipulation',
    'socialize',
    penaltyObject(penalties),
    excellencyAbils,
    bonus,
  )
}
export default guile
