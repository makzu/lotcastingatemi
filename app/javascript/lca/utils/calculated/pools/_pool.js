// @flow
import { abil, attr, specialtiesFor } from '..'
import { maxExcellency } from '../excellencies'
import type { Character, Pool, PoolBonus } from 'utils/flow-types'

export default function pool(
  name: string,
  character: Character,
  attribute: string,
  ability: string,
  bonus: Array<PoolBonus>,
  penalties: Array<Object>,
  excellencyAbils: Array<string>,
  specialAttacks?: Array<string> = []
): Pool {
  const _attr = attr(character, attribute)
  const _abil = abil(character, ability)
  const pool = _attr + _abil
  let mb = 0
  if (bonus.length > 0)
    mb = bonus.reduce((a, b) => a + (b.situational ? 0 : b.bonus), 0)

  const excellency = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    false
  )
  const excellencyStunt = maxExcellency(
    character,
    attribute,
    ability,
    excellencyAbils,
    false,
    true
  )
  const penalty = penalties.reduce((a, p) => a + p.penalty, 0)

  return {
    name: name,
    attribute: attribute,
    attributeRating: _attr,
    ability: ability,
    abilityRating: _abil,
    raw: pool,
    bonus: bonus || [],
    specialties: specialtiesFor(character, ability),
    excellency: excellency,
    excellencyCost: excellency,
    excellencyStunt: excellencyStunt,
    excellencyStuntCost: excellencyStunt,
    penalties: penalties,
    totalPenalty: penalty,
    total: Math.max(pool + mb - penalty, 0),
    specialAttacks: specialAttacks,
  }
}
