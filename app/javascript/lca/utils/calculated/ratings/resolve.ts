import rating from './_rating'
import { penaltyObject } from '../index'
import { halfRoundUp } from 'utils'
import { Character } from 'types'
import { PoolBonus } from 'utils/flow-types/pool'
import { PenaltyInput } from 'selectors'

export function resolve(
  character: Character,
  merits: string[],
  penalties: PenaltyInput,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  const wellBred = merits.find((m) => m.startsWith('well-bred'))
  if (wellBred !== undefined)
    bonus = bonus.concat([
      {
        label: 'well-bred',
        bonus: 1,
        situational: true,
      },
    ])
  const thinBlood = merits.find((m) => m.startsWith('thin-blooded'))
  if (thinBlood !== undefined)
    bonus = bonus.concat([
      {
        label: 'thin-blooded',
        bonus: -1,
        situational: true,
      },
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
