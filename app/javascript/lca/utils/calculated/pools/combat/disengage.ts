import pool from '../_pool'
import { penaltyObject } from '../../index'
import { Character } from 'types'
export function disengage(
  character: Character,
  merits: string[],
  penalties: Record<string, $TSFixMe>,
  excellencyAbils: string[],
) {
  let bonus = [] as PoolBonus[]
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [
      {
        label: 'fleet of foot',
        bonus: 1,
      },
    ]
  if (character.type !== 'Character' && character.caste === 'water')
    bonus = bonus.concat([
      {
        label: 'sux/3m anima',
        bonus: 1,
        situational: true,
      },
    ])
  return pool(
    'Disengage',
    character,
    'dexterity',
    'dodge',
    bonus,
    penaltyObject(penalties, {
      useMobility: true,
    }),
    excellencyAbils,
  )
}
export default disengage
