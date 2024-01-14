import type { Character, Penalty, PoolBonus } from '@/types'
import { halfRoundUp } from '@/utils'
import { penaltyObject } from '../index'
import rating from './_rating'

export function resolve(
  character: Character,
  merits: string[],
  penalties: Penalty[],
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  const wellBred = merits.find((m) => m.startsWith('well-bred'))
  if (wellBred !== undefined)
    bonus = bonus.concat([{ label: 'well-bred', bonus: 1, situational: true }])

  const thinBlood = merits.find((m) => m.startsWith('thin-blooded'))
  if (thinBlood !== undefined)
    bonus = bonus.concat([
      { label: 'thin-blooded', bonus: -1, situational: true },
    ])

  if ((character.caste || '').toLowerCase() === 'full moon') {
    bonus = bonus.concat([
      {
        label: 'vs threaten/fear (anima)',
        bonus: halfRoundUp(
          Math.max(
            character.attr_strength,
            character.attr_dexterity,
            character.attr_stamina,
          ),
        ),
        situational: true,
      },
    ])
  }

  return rating(
    'Resolve',
    character,
    'wits',
    'integrity',
    penaltyObject(penalties),
    excellencyAbils,
    bonus,
  )
}
export default resolve
