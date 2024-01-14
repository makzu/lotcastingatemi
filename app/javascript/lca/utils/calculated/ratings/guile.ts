import type { Character, PoolBonus, penaltyObj } from '@/types'
import { penaltyObject } from '../index'
import rating from './_rating'

export function guile(
  character: Character,
  merits: string[],
  penalties: penaltyObj,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
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
