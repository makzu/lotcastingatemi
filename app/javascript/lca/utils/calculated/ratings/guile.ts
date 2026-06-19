import type { Character } from '@lca/types'
import type { BlockOfPenalties } from '@lca/types/pool'
import { penaltyObject } from '../index'
import rating from './_rating'

export function guile(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
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
