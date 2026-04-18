import pool from '../_pool'
import { penaltyObject } from '../../index'
import type { Character } from 'types'
import { BlockOfPenalties } from 'types/pool'

export function disengage(
  character: Character,
  merits: Array<string>,
  penalties: BlockOfPenalties,
  excellencyAbils: Array<string>,
) {
  let bonus = []
  if (merits.some((m) => m.startsWith('fleet of foot')))
    bonus = [{ label: 'fleet of foot', bonus: 1 }]
  if (character.type !== 'Character' && character.caste === 'water')
    bonus = bonus.concat([
      { label: 'sux/3m anima', bonus: 1, situational: true },
    ])

  return pool(
    'Disengage',
    character,
    'dexterity',
    'dodge',
    bonus,
    penaltyObject(penalties, { useMobility: true }),
    excellencyAbils,
  )
}

export default disengage
