import rating from './_rating'
import { penaltyObject } from '../index'
import { Character } from 'types'
import { PoolBonus } from 'utils/flow-types/pool'
import { PenaltyInput } from 'selectors'

export function guile(
  character: Character,
  merits: string[],
  penalties: PenaltyInput,
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
